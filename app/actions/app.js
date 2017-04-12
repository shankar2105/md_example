import * as api from '../api.js';

export const SET_MESSAGE = 'SET_MESSAGE';
export const CONNECT = 'CONNECT';
export const AUTHORISE = 'AUTHORISE';
export const CREATE_MD = 'CREATE_MD';
export const GET_MD = 'GET_MD';
export const DELTE_KEY = 'DELTE_KEY';
export const LOCAL_KEY = 'LOCAL_KEY';

export const authorise = () => ({
    type: AUTHORISE,
    payload: api.authorise()
});

export const setMessage = (msg) => ({
    type: SET_MESSAGE,
    msg
});

export const getConnected = () => {
    return {
        type: CONNECT,
        payload: api.connect(getLocal())
    };
};

export const createMD = () => ({
    type: CREATE_MD,
    payload: api.createMd()
});

export const getMD = () => ({
    type: GET_MD,
    payload: api.getMdEntries()
});

export const deleteKey = () => ({
    type: DELTE_KEY,
    payload: api.deleteKey()
});

export const setLocal = (resUri) => {
    window.localStorage.setItem(LOCAL_KEY, resUri);
};

export const getLocal = () => {
    return window.localStorage.getItem(LOCAL_KEY);
};
