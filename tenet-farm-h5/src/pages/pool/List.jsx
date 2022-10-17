import React, { useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';
import { Toast } from 'antd-mobile';
import './list.less';

import AppContext from '../../state';
import PoolListComponent from '../../components/pool/List';
import { ApiPoolList } from '../../service/Pool';

const PoolList = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const context = useWeb3React();
  const appContext = useContext(AppContext);
  const { active, account } = context;

  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState([]); // 分页数据
  const [params, setParams] = useState({ page: 1, count: 10000, sort: '', sortdir: '', search: '', state: '5', addr: '' });

  // query
  function queryPools() {
    if (!account) return;
    setLoading(true);
    ApiPoolList({ ...params, addr: account })
      .then((res) => {
        setDataSource(res.datas || []);
        setLoading(false);
      })
      .catch((err) => {
        Toast.info(err.msg);
        setLoading(false);
      });
    return () => {
      setDataSource([]);
    };
  }

  useEffect(queryPools, [params, account, appContext.poolListRefresh]);

  // sort
  function onChange(p) {
    setParams(p);
  }

  return (
    <div className="pool-list-wrap">
      <div className="cat-box">
        <img src="/images/pool/cat.png" alt="" className="cat" />
      </div>
      <p className="desc">{t('pool.create.title')}</p>
      <p className="desc">{t('pool.users')}</p>
      {!active ? (
        <div className="btn-box" onClick={() => appContext.toggleWalletVisible(true)}>
          <button className="btn-theme">{t('btn.unlock')}</button>
        </div>
      ) : (
        <PoolListComponent dataSource={dataSource} type="create" params={params} evtFunc={(t) => onChange(t)} loading={loading} status={1}></PoolListComponent>
      )}
      <div className="blank"></div>
      {active && (
        <div className="btn-box btn-fix-box">
          <button className="btn-theme" onClick={() => history.push('/pool/create')}>
            {t('title.create.pool')}
          </button>
        </div>
      )}
    </div>
  );
};

export default PoolList;
