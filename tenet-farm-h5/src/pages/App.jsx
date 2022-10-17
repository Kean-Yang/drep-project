import React, { useState } from 'react';
import { LocaleProvider } from 'antd-mobile';
import { I18nMessage } from '../i18n/Message';
import AppRouter from '../routers';
import AppContext from '../state';

import Wallet from '../components/wallet';

const App = () => {
  const [walletVisible, setWalletVisible] = useState(false);
  const [poolListRefresh, setPoolListRefresh] = useState(false);
  const [web3, setWeb3] = useState(null);

  return (
    <LocaleProvider locale={I18nMessage}>
      <AppContext.Provider
        value={{
          walletVisible,
          web3,
          toggleWalletVisible: (flag) => setWalletVisible(flag),
          updateWeb3: (obj) => setWeb3(obj),
          poolListRefresh,
          togglePLR: (flag) => setPoolListRefresh(flag),
        }}
      >
        <AppRouter />
        <Wallet></Wallet>
      </AppContext.Provider>
    </LocaleProvider>
  );
};

export default App;
