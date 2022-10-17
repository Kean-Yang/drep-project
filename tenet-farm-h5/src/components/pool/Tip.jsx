import React, { useEffect, useState, useContext } from 'react';
import { Toast, Modal } from 'antd-mobile';
import { useTranslation } from 'react-i18next';
import { useLocation, useHistory } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';
import './tip.less';
import { TX_ETHERSCAN_URL } from '../../constants';
import { ApiPoolInfo } from '../../service/Pool';
import AppContext from '../../state';

let messageCount = [];

const PoolInfo = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const location = useLocation();
  const context = useWeb3React();
  const { account } = context;
  const appContext = useContext(AppContext);
  const [visible, setVisible] = useState(false);
  const [entity, setEntity] = useState({});

  useEffect(() => {
    return () => {
      // 全部销毁
      // notification.destroy();
      messageCount = 0;
    };
  }, [location.pathname]);

  useEffect(() => {
    let timer = undefined;
    if (!account) {
      clearInterval(timer);
      return;
    }
    const queryPoolInfo = () => {
      ApiPoolInfo({ addr: account })
        .then((res) => {
          messageCount = [];
          let temp = res.datas || [];
          temp.forEach((element) => {
            // 0 pending
            if (element.status === '0' && location.pathname === '/pool/list') {
              let temp = messageCount.filter((item) => item.id === element.id);
              if (!temp.length) {
                if (messageCount.length <= 3) {
                  messageCount.push(element);
                  // showNotification(element);
                }
              }
            }
            // 1 创建成功
            if ((element.status === '1' || element.status === '-1') && element.id !== entity.id) {
              // notification.destroy();
              let temp = messageCount;
              temp.forEach((ele, index) => {
                if (ele.id === element.id) {
                  messageCount.splice(index, 1);
                } else {
                  // showNotification(ele);
                }
              });
              setEntity(element);
              setVisible(true);
              if (element.status === '1') appContext.togglePLR(true);
            }
          });
        })
        .catch((err) => {
          Toast.info(err.msg);
        });
    };

    if (!timer) {
      timer = setInterval(() => {
        queryPoolInfo();
      }, 10 * 1000);
      queryPoolInfo();
    }
    return () => {
      clearInterval(timer);
    };
  }, [account, location.pathname, entity.id, appContext]);

  return (
    <div className="container" id="MR">
      <Modal visible={visible} className="pool-info-modal" transparent>
        <div className="content">
          <img src={`/images/pool/${entity.status === '-1' ? 'fail' : 'success'}.png`} alt="" />
          <p>{entity.status === '-1' ? t('pool.from.createfail', { p: entity.pairname || '' }) : t('pool.from.createsuccess', { p: entity.pairname || '' })}</p>
          <div className="btn-box">
            <button className="btn-theme" onClick={() => setVisible(false)}>
              {t('but.I.got.it')}
            </button>

            {entity.status === '-1' ? (
              <a href={`${TX_ETHERSCAN_URL}${entity.hash || ''}`} className="btn-theme" target="_blank" rel="noopener noreferrer">
                {t('pool.but.check')}
              </a>
            ) : entity.status === '-99' ? (
              <button
                className="btn-theme"
                onClick={() => {
                  setVisible(false);
                  history.push(`/pool/list`);
                }}
              >
                {t('pool.but.check')}
              </button>
            ) : (
              <button
                className="btn-theme"
                onClick={() => {
                  setVisible(false);
                  history.push(`/pool/detail?id=${entity.pid}`);
                }}
              >
                {t('pool.but.check')}
              </button>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default PoolInfo;
