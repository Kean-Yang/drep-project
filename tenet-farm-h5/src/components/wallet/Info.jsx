import React, { useState, useImperativeHandle, useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from 'antd-mobile';
import { CloseOutlined } from '@ant-design/icons';
import { useWeb3React } from '@web3-react/core';
import './info.less';
import AppContext from '../../state';
import defiUtil from '../../utils/DefiUtil';
import * as Tool from '../../utils/Tools';

import { walletconnect } from '../../utils/Connectors';

const WalletInfo = (props) => {
  const { t } = useTranslation();
  const context = useWeb3React();
  const appContext = useContext(AppContext);
  const web3 = appContext.web3;
  const { connector, deactivate, account } = context;
  const [visible, setVisible] = useState(false);
  const [balance, setBalance] = useState();

  function toggleVisible(flag) {
    setVisible(flag);
  }
  useImperativeHandle(props.cRef, () => ({
    toggleVisible,
  }));

  useEffect(() => {
    if (!web3 || !account) return;
    const getAccount = async () => {
      // 查询账号信息
      const gfB = await defiUtil.getTenTokenBalanceOf(web3, account);
      setBalance(Tool.fmtDec(gfB ? web3.utils.fromWei(gfB || '0') : 0, 4));
    };
    getAccount();
  }, [web3, account]);

  return (
    <Modal title={t('home.wallet')} visible={visible} className="wallet-info-wrap" transparent>
      <div className="content">
        <div className="close-box" onClick={() => toggleVisible(false)}>
          <CloseOutlined />
        </div>
        <div className="info-box">
          <div className="coin-logo">
            <img src="/images/logo/tenet.png" alt="" />
          </div>
          <p className="balance"> {balance}</p>
          <p className="account-name">{t('pool.account', { p: 'TEN' })}</p>
          <a href={`https://etherscan.io/address/${account}`} target="_blank" rel="noopener noreferrer" className="btn-theme mb16">
            {t('pool.view.reward')}
          </a>
          <button
            className="btn-theme mb16"
            onClick={() => {
              try {
                toggleVisible(false);
                if (connector === walletconnect) {
                  connector.close();
                } else {
                  deactivate();
                }
              } catch (error) {}
            }}
          >
            {t('home.log.out')}
          </button>
          <button
            className="btn-theme"
            onClick={() => {
              toggleVisible(false);
            }}
          >
            {t('but.cancel')}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default WalletInfo;
