import { remote, ipcRenderer as ipc } from 'electron';
import React from 'react';
import { render } from 'react-dom';
import { hashHistory } from 'react-router';
import { AppContainer } from 'react-hot-loader';
import { syncHistoryWithStore } from 'react-router-redux';
import Root from './containers/Root';
import configureStore from './store/configureStore';
import './app.global.css';
import { setMessage, setLocal } from './actions/app';

const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store);

ipc.on('auth-response', (event, res) => {
  store.dispatch(setMessage('Authorised. Please wait. Connecting...'));
  setLocal(res);
});

render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    const NextRoot = require('./containers/Root'); // eslint-disable-line global-require
    render(
      <AppContainer>
        <NextRoot store={store} history={history} />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
