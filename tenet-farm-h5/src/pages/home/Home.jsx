import React, { useState, useEffect, useContext } from 'react';
import { Icon, Toast } from 'antd-mobile';
import { useTranslation } from 'react-i18next';
import { useWeb3React } from '@web3-react/core';
import './home.less';

import PoolList from '../../components/pool/List';
import { ApiPoolList } from '../../service/Pool';
import AppContext from '../../state';

const Home = () => {
  const { t } = useTranslation();
  const context = useWeb3React();
  const { active, account } = context;
  const appContext = useContext(AppContext);

  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState([]); // 分页数据
  const [params, setParams] = useState({ page: 1, count: 10000, sort: '', sortdir: '', search: '', addr: '' });
  const [statusList] = useState([t('state.ongoing'), t('state.start.soon'), t('state.closed'), t('home.mine')]);
  const [status, setStatus] = useState(1);

  // query
  function queryPools() {
    setLoading(true);
    ApiPoolList({ ...params, state: status, addr: status === 4 ? account || '' : '' })
      .then((res) => {
        setDataSource(res.datas || []);
        setLoading(false);
      })
      .catch((err) => {
        Toast.info(err.msg);
        setLoading(false);
      });
  }

  useEffect(queryPools, [params, status, account]);

  // sort
  function onChange(p) {
    setParams(p);
  }

  // input search
  function inputChange(e) {
    setParams({ ...params, search: e.target.value });
  }

  // status
  function switchStatus(index) {
    setStatus(index);
  }

  return (
    <div className="home-wrap">
      <div className="cat-box">
        <img src="/images/pool/cat.png" alt="" className="cat" />
      </div>

      <p className="desc">{t('home.desc')}</p>

      <ul className="tab-box">
        {statusList.map((item, index) => {
          return (
            <li className={status === index + 1 ? 'active' : ''} onClick={() => switchStatus(index + 1)} key={`status${index}`}>
              {item}
            </li>
          );
        })}
      </ul>

      <div className="search-from">
        <Icon type="search" />
        <input type="text" placeholder={t('home.search')} onChange={inputChange} />
      </div>
      {status === 4 && !active ? (
        <div className="uw-bo">
          <button className="btn-theme" onClick={() => appContext.toggleWalletVisible(true)}>
            {t('btn.unlock')}
          </button>
        </div>
      ) : (
        <PoolList dataSource={dataSource} type="home" loading={loading} params={params} evtFunc={(t) => onChange(t)} status={status}></PoolList>
      )}
    </div>
  );
};

export default Home;
