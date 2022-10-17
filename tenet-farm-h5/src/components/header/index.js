import React, { useState, Fragment, useContext, useRef } from 'react';
import { Icon, Modal } from 'antd-mobile';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';
import './style.less';
import { langList, getLang, switchLang } from '../../i18n/LangUtil';
import AppContext from '../../state';

import WalletInfo from '../wallet/Info';

const Header = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const context = useWeb3React();
  const appContext = useContext(AppContext);
  const { active, account } = context;
  const [langVisible, setLangVisible] = useState(false);
  const lang = getLang();
  const [visible, setVisible] = useState(false);
  const walletInfoRef = useRef();

  return (
    <div className={`head-wrap ${!visible ? 'head-shadow' : ''}`}>
      <div>
        <img src={require('../../assets/icon/menu.svg')} className="icon-menu" alt="" onClick={() => setVisible(!visible)} />
      </div>
      <div>
        <img src="/images/logo.png" alt="" className="logo" />
      </div>
      <div>
        {active ? (
          <span className="addr one-txt-cut" onClick={() => walletInfoRef.current.toggleVisible(true)}>
            {`${account.substring(0, 6)}...${account.substring(account.length, account.length - 4)}` || ''}
          </span>
        ) : (
          <span className="wallet" onClick={() => appContext.toggleWalletVisible(true)}>
            {t('btn.unlock')}
          </span>
        )}
      </div>

      <Modal visible={visible} popup transparent={true} animationType="" onClose={() => setVisible(false)} className="menu-wrap">
        <div className="menu-box">
          <ul className="menu-list">
            <li className={['/', '/pool/detail'].includes(location.pathname) ? 'active' : ''}>
              <Link to="/" onClick={() => setVisible(false)}>
                {t('title.home')}
              </Link>
            </li>
            <li className={['/pool/list', '/pool/create'].includes(location.pathname) ? 'active' : ''}>
              <Link to="/pool/list" onClick={() => setVisible(false)}>
                {t('title.create.pool')}
              </Link>
            </li>
            <li>
              <a href="https://569781349.gitbook.io/tenet/" target="_blank" rel="noopener noreferrer">
                About
              </a>
            </li>
            <li>
              <a href="/" target="_blank" rel="noopener noreferrer">
                Github
              </a>
            </li>
            <li>
              <a href="https://tenet-resource.s3-ap-northeast-1.amazonaws.com/Tenet+White+Paper+EN+V1.pdf" target="_blank" rel="noopener noreferrer">
                Whitepaper
              </a>
            </li>
            <li
              className={langVisible ? 'active' : ''}
              onClick={(e) => {
                setLangVisible(!langVisible);
              }}
            >
              切换语言({langList[lang].t}) <Icon type={langVisible ? 'up' : 'down'} />
            </li>
            {langVisible && (
              <Fragment>
                {Object.keys(langList).map((item) => {
                  return (
                    <li className={lang === item ? 'active' : ''} onClick={() => switchLang(item)} key={item}>
                      {langList[item].t}
                    </li>
                  );
                })}
              </Fragment>
            )}
          </ul>
          <ul className="society">
            <li>
              <a href="https://discord.gg/AhYgyzA" target="_blank" rel="noopener noreferrer">
                <img src="/images/icon/discord.png" alt="" />
              </a>
            </li>
            <li>
              <a href="https://twitter.com/TenetFarm" target="_blank" rel="noopener noreferrer">
                <img src="/images/icon/twitter.png" alt="" />
              </a>
            </li>
            <li>
              <a href="https://medium.com/@TenetFarm" target="_blank" rel="noopener noreferrer">
                <img src="/images/icon/medium.png" alt="" />
              </a>
            </li>
            <li>
              <a href="https://t.me/Tenetfarm" target="_blank" rel="noopener noreferrer">
                <img src="/images/icon/telegram.png" alt="" />
              </a>
            </li>
            <li>
              <a href="https://tenet-resource.s3-ap-northeast-1.amazonaws.com/Tenet+White+Paper+EN+V1.pdf" target="_blank" rel="noopener noreferrer">
                <img src="/images/icon/whitepaper.png" alt="" />
              </a>
            </li>
          </ul>
        </div>
      </Modal>

      <WalletInfo cRef={walletInfoRef}></WalletInfo>
    </div>
  );
};

export default Header;
