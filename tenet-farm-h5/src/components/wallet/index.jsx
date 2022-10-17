import React, {
  useEffect,
  useContext,
  useCallback,
  // useState
} from 'react';
import { useWeb3React } from '@web3-react/core';
// import { useTranslation } from 'react-i18next';
import {
  // injected,
  walletconnect,
} from '../../utils/Connectors';
import { Modal } from 'antd-mobile';
import Web3 from 'web3';

import AppContext from '../../state';
import './wallet.less';

const Wallet = (props) => {
  // const { t } = useTranslation();
  const context = useWeb3React();
  const appContext = useContext(AppContext);
  //   const { connector, library, chainId, account, activate, deactivate, active, error } = context;
  const { library, connector, activate } = context;
  // handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = React.useState();

  // const [mm, setMm] = useState(false);

  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  const UW = useCallback(() => {
    if (library && library.provider) {
      const web3 = new Web3(library.provider);
      appContext.updateWeb3(web3);
    }
  }, [appContext, library]);

  useEffect(UW, [library]);

  function changeWallet(c) {
    setActivatingConnector(c);
    activate(c);
    appContext.toggleWalletVisible(false);
  }

  return (
    <div>
      <Modal
        title=""
        visible={appContext.walletVisible}
        popup
        maskClosable
        animationType="slide-up"
        wrapClassName="wallet-wrap"
        onClose={() => {
          appContext.toggleWalletVisible(false);
        }}
      >
        <div className="wallet-con">
          <ul>
            {/* <li
              className={!!(connector === injected) ? 'active' : ''}
              onClick={() => {
                if (!window.ethereum) {
                  setMm(true);
                } else {
                  changeWallet(injected);
                }
              }}
            >
              {mm ? <a href="https://metamask.io/">Install MetaMask</a> : <span>MetaMask</span>}
              <img src="/images/wallet/metamask.png" alt="" />
            </li> */}
            <li className={!!(connector === walletconnect) ? 'active' : ''} onClick={() => changeWallet(walletconnect)}>
              <span>WalletConnet</span>
              <img src="/images/wallet/walletConnectIcon.svg" alt="" />
            </li>
          </ul>
        </div>
      </Modal>
    </div>
  );
};

export default Wallet;
