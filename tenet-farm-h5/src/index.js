import React from 'react';
import ReactDOM from 'react-dom';
import App from './pages/App';
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import * as serviceWorker from './serviceWorker';
import './i18n/I18n';
import './assets/js/common';
import './styles/style.less';

function getLibrary(provider) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 15000;
  return library;
}

ReactDOM.render(
  <Web3ReactProvider getLibrary={getLibrary}>
    <App />
  </Web3ReactProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();
