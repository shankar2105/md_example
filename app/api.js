import { shell } from 'electron';
import safeApp from 'safe-app';
import pkg from './package.json';
import crypto from 'crypto';

const typetag = 16543;
let safe = null;
let dataEntries = {};

const parseUrl = (url) => (
  (url.indexOf('safe-auth://') === -1) ? url.replace('safe-auth:', 'safe-auth://') : url
);

const APP_INFO = {
  data: {
    id: pkg.identifier,
    scope: null,
    name: pkg.name,
    vendor: pkg.author.name
  },
  opt: {
    own_container: false
  },
  permissions: {
    _public: [
      'Read',
      'Insert',
      'Update',
      'Delete',
      'ManagePermissions'
    ]
  }
};

const publicId = crypto.randomBytes(32).toString('hex');
const SAMPLE_KEYS = {'key1': 'val1', 'key2': 'val2'};

export const authorise = () => {
  return safeApp.initializeApp(APP_INFO.data)
    .then((app) => app.auth.genAuthUri(APP_INFO.permissions, APP_INFO.opt))
    .then((res) => {
      shell.openExternal(parseUrl(res.uri))
    });
};

export const connect = (resUri) => {
  return safeApp.fromAuthURI(APP_INFO.data, resUri)
    .then((app) => (safe = app));
};

export const createMd = () => {
  let publicName = null;
  return safe.mutableData.newRandomPublic(typetag)
    .then((m) => m.quickSetup(SAMPLE_KEYS).then(() => m.getNameAndTag()))
    .then((data) => (publicName = data.name))
    .then(() => safe.auth.getAccessContainerInfo('_public'))
    .then((mdata) => mdata.getEntries()
      .then((entries) => entries.mutate()
        .then((mut) => mut.insert(publicId, publicName)
          .then(() => mdata.applyEntriesMutation(mut)))))
          .then(() => SAMPLE_KEYS);
};

export const getMdEntries = () => {
  dataEntries = {};
  return safe.auth.getAccessContainerInfo('_public')
    .then((mdata) => mdata.getEntries())
    .then((entries) => entries.get(publicId))
    .then((value) => safe.mutableData.newPublic(value.buf, typetag))
    .then((mut) => mut.getEntries()
      .then((entries) => entries.forEach((key, val, version) => {
        dataEntries[key.toString()] = val.buf.toString();
      })))
      .then(() => dataEntries);
};

export const deleteKey = () => {
  const key = Object.keys(dataEntries)[0];
  return safe.auth.getAccessContainerInfo('_public')
    .then((mdata) => mdata.getEntries())
    .then((entries) => entries.get(publicId))
    .then((value) => safe.mutableData.newPublic(value.buf, typetag))
    .then((mdata) => mdata.getEntries()
      .then((entries) => entries.get(key)
        .then((value) => entries.mutate()
            .then((mut) => mut.remove(key, value.version + 1)
              .then(() => mdata.applyEntriesMutation(mut))))));
};
