import React from 'react';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import Image from 'rc-image';
import './list.less';
import * as Tool from '../../utils/Tools';
import { DEFAULT_IMG, P_ID, COIN_LOGO_URL } from '../../constants';
import { getLang } from '../../i18n/LangUtil';

import up from '../../assets/icon/arrow-up-filling.svg';
import down from '../../assets/icon/arrow-down-filling.svg';
import sorting from '../../assets/icon/sorting.svg';
import EmptyData from '../../components/empty/NoData';
import LoadingComponent from '../../components/load/Loading';

const langW = { 'zh-CN': 300, 'ko-KR': 300, 'en-US': 330, 'vi-VN': 360 };

const PoolList = (props) => {
  const { t } = useTranslation();
  const history = useHistory();
  const { loading, dataSource, evtFunc, params, status, type } = props;

  // sort
  function onChange(field) {
    let temp = { ...params };
    let t = temp['sort'];
    temp['sort'] = field;
    let td = temp['sortdir'];
    if (t === field) {
      temp['sortdir'] = td ? (td === 'up' ? 'down' : '') : 'up';

      if (!td) {
        temp['sortdir'] = 'up';
      } else if (td === 'up') {
        temp['sortdir'] = 'down';
      } else if (td === 'down') {
        temp['sortdir'] = 'up';
      }
      if (!temp['sortdir']) {
        temp['sort'] = '';
      }
    } else {
      temp['sortdir'] = 'up';
    }
    evtFunc(temp);
  }

  function getIcon(field) {
    if (params.sort === field) {
      if (params.sortdir === 'up') {
        return up;
      } else if (params.sortdir === 'down') {
        return down;
      } else {
        return sorting;
      }
    } else {
      return sorting;
    }
  }

  return (
    <div className="list-wrap">
      <div className="table-box">
        <table className="table" style={{ width: `${langW[getLang()]}%` }}>
          <thead>
            <tr>
              <th>{t('home.pool')}</th>
              <th className="fixedColumn"></th>
              <th>
                <div>
                  {t('home.rol')}
                  <span onClick={() => onChange('ROI')}>
                    <img src={getIcon('ROI')} alt="" />
                  </span>
                </div>
              </th>
              <th>
                <div>
                  {t('pool.starting.height')}
                  <span onClick={() => onChange('startblock')}>
                    <img src={getIcon('startblock')} alt="" />
                  </span>
                </div>
              </th>
              <th>
                <div>
                  {t('pool.closing.heighttime')}
                  <span onClick={() => onChange('endblock')}>
                    <img src={getIcon('endblock')} alt="" />
                  </span>
                </div>
              </th>
              <th>
                <div>
                  {t('pool.reward')}
                  <span onClick={() => onChange('rewardperblock')}>
                    <img src={getIcon('rewardperblock')} alt="" />
                  </span>
                </div>
              </th>
              <th>
                <div>
                  {t('pool.lmrewards')}
                  <span onClick={() => onChange('lmreward')}>
                    <img src={getIcon('lmreward')} alt="" />
                  </span>
                </div>
              </th>
              <th>
                <div>
                  {t('pool.remaining.aut')}
                  <span onClick={() => onChange('leftamount')}>
                    <img src={getIcon('leftamount')} alt="" />
                  </span>
                </div>
              </th>
              <th style={{ textAlign: 'center' }}>{t('pool.operation')}</th>
            </tr>
          </thead>
          <tbody>
            {dataSource.map((record) => {
              return (
                <tr key={record.id}>
                  <td>
                    <div className="base-info-box">
                      {record.pid === '-2' ? (
                        <img src="/images/logo/tenet.png" alt="" className="logo" />
                      ) : (
                        <Image width={36} height={36} src={COIN_LOGO_URL.replace('[address]', record.tokenaddr || '')} fallback={DEFAULT_IMG} prefixCls="logo" />
                      )}
                      {record.pid === '-2' && <img src="/images/pool/v.png" className="v" alt="" />}
                      {type === 'create' && Tool.LE(record.blocknumber || 0, record.createblock || 0) && <img src="/images/pool/new.png" alt="" className="new" />}
                      <div className="info-box">
                        <div className="info-title">
                          {record.poolname}&nbsp;
                          {record.pid === '-2' && <span className="tag">Offical</span>}
                        </div>
                        <div className="info-desc">
                          {t('pool.earn')} {`${record.pid !== P_ID && record.tokensymbol ? record.tokensymbol + ' +' : ''} TEN`}
                        </div>
                        <div className="info-desc">{record.lptokenfrom || ''}</div>
                      </div>
                    </div>
                  </td>
                  <td className="fixedColumn"></td>
                  <td>
                    <div className="info-box">
                      <div className="info-title">
                        {Tool.fmtDec(Tool.mul(Tool.mul(record.ROI || 0, 100), 24 * 365), 2)}% {t('pool.yearly')}
                      </div>
                      <div className="info-desc">
                        {Tool.fmtDec(Tool.mul(record.ROI || 0, 100), 2)}% {t('home.hourly')}
                      </div>
                      <div className="info-desc">
                        {Tool.fmtDec(Tool.mul(Tool.mul(record.ROI || 0, 100), 24), 2)}% {t('home.daily')}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="info-box">
                      <div className="info-title">#{record.startblock || 0}</div>
                      <div className="info-desc">
                        {Tool.LT(record.blocknumber || 0, record.startblock || 0)
                          ? moment(parseInt(Tool.plus(Tool.mul(Tool.sub(record.startblock || 0, record.blocknumber || 0), 15 * 1000), new Date().getTime())))
                              // .utc()
                              // .add(8, 'hours')
                              .format('YYYY-MM-DD HH:mm')
                          : moment(parseInt(Tool.sub(new Date().getTime(), Tool.mul(Tool.sub(record.blocknumber || 0, record.startblock || 0), 15 * 1000))))
                              // .utc()
                              // .add(8, 'hours')
                              .format('YYYY-MM-DD HH:mm')}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="info-box">
                      <div className="info-title">#{record.endblock}</div>
                      <div className="info-desc">
                        {Tool.LT(record.blocknumber || 0, record.endblock || 0)
                          ? moment(parseInt(Tool.plus(Tool.mul(Tool.sub(record.endblock || 0, record.blocknumber || 0), 15 * 1000), new Date().getTime())))
                              // .utc()
                              // .add(8, 'hours')
                              .format('YYYY-MM-DD HH:mm')
                          : moment(parseInt(Tool.sub(new Date().getTime(), Tool.mul(Tool.sub(record.blocknumber || 0, record.endblock || 0), 15 * 1000))))
                              // .utc()
                              // .add(8, 'hours')
                              .format('YYYY-MM-DD HH:mm')}
                      </div>
                    </div>
                  </td>
                  <td>
                    {Tool.LE(record.blocknumber || 0, record.tokenbonusendblock || 0) ? (
                      <div className="info-box">
                        <span className="info-title">
                          {Tool.fmtDec(record.rewardperblock || 0, 4)}&nbsp;
                          <em className="tag-mul">{record.tokenbonusmul || 0}x</em>
                        </span>
                        <span className="info-desc">{record.tokensymbol || ''}</span>
                        <span className="info-desc">
                          {t('pool.remaining.title')} &nbsp;
                          {Tool.fmtShowTime(Tool.toNumber(Tool.mul(Tool.sub(record.tokenbonusendblock || 0, record.blocknumber || 0), 15)))}
                        </span>
                      </div>
                    ) : (
                      <div className="info-box">
                        <span className="info-title">{Tool.fmtDec(record.rewardperblock || 0, 4)}</span>
                        <span className="info-desc">{record.tokensymbol || ''}</span>
                      </div>
                    )}
                  </td>
                  <td>
                    <div className="info-box">
                      <div className="info-title">{Tool.fmtDec(record.lmreward || 0, 4)}</div>
                      <div className="info-desc">TEN</div>
                    </div>
                  </td>
                  <td>
                    <div className="info-box">
                      <div className="info-title">{Tool.fmtDec(record.leftamount || 0, 2)}</div>
                      <div className="info-desc">{record.tokensymbol || ''}</div>
                    </div>
                  </td>
                  <td>
                    <div>
                      {status === 0 ? (
                        <button className="btn-theme" onClick={() => history.push(`/pool/detail?id=${record.pid}`)}>
                          {t('home.start.mine')}
                        </button>
                      ) : (
                        <button className="btn-theme" onClick={() => history.push(`/pool/detail?id=${record.pid}`)}>
                          {t('home.choose')}
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {loading ? <LoadingComponent /> : !dataSource.length && <EmptyData />}
    </div>
  );
};

export default PoolList;
