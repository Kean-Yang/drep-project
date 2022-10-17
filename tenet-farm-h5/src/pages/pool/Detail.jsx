import React, { useEffect, useState, Fragment, useCallback, useContext } from 'react';
import { Toast, Modal, Button } from 'antd-mobile';
import { useTranslation } from 'react-i18next';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import moment from 'moment';
import { useWeb3React } from '@web3-react/core';
import Image from 'rc-image';
import { CopyOutlined, CloseOutlined, CheckCircleOutlined } from '@ant-design/icons';
import './detail.less';
import * as Tool from '../../utils/Tools';
import defiUtil from '../../utils/DefiUtil';
import { ApiPoolDetail, ApiPoolProjectTraRecord, ApiPoolTraRecord } from '../../service/Pool';
import {
  DEFAULT_IMG,
  P_ID,
  GF_ADDRESS,
  TX_ETHERSCAN_URL,
  // ADDR_ETHERSCAN_URL,
  PLATFORM,
  COIN_LOGO_URL,
} from '../../constants';
import dr from '../../assets/icon/direction-right.svg';
import AppContext from '../../state';
import EmptyData from '../../components/empty/NoData';
import LoadingComponent from '../../components/load/Loading';

const PoolDetail = () => {
  const { t } = useTranslation();
  const context = useWeb3React();
  const appContext = useContext(AppContext);
  const web3 = appContext.web3;
  const { active, account = '' } = context;

  const pid = Tool.getURLParams('id') || '';
  const [poolDetail, setPoolDetail] = useState({});

  const [approve, setApprove] = useState(false);
  const [approveStatus, setApproveStatus] = useState(false);

  const [unlockW, setUnlockW] = useState(false); // unlock modal
  const [unlockWMAmount, setUnlockWMAmount] = useState(0); // unlock max amount; 质押LP token数量
  const [withdrawAmount, setWithdrawAmount] = useState(); // unlock withraw amount

  const [unlockR, setUnlockR] = useState(false); // unlock modal
  // const [unlockRMAmount, setUnlockRMAmount] = useState(0); // unlock max amount
  const [rechargeAmount, setRechargeAmount] = useState(); // unlock recharge amount

  const [tipTrading, setTipTrading] = useState(false); // 交易成功提示
  const [submitTrading, setSubmitTrading] = useState(false); // 交易提交成功
  const [gainVisible, setGainVisible] = useState(false);

  const [loading, setLoading] = useState(false); // 表格加载状态
  const [recordList, setRecordList] = useState([]); // 最近7笔交易记录
  const [record, setRecord] = useState({}); // 最新交易记录

  const [gfBalance, setGfBalance] = useState(0); // 官方余额
  const [gfReceive, setGfReceive] = useState(0); // 可领取的TEN(getPendingTenByUser)
  const [xmfReceive, setXmfReceive] = useState(0); // 项目方可领取的币
  const [xmfBalance, setXmfBalance] = useState(0); // 项目方余额
  const [zyBalance, setZyBalance] = useState(0); // 质押余额
  const [exchangeLp, setExchangeLp] = useState(true); //兑换LP Token
  const [lines, setLines] = useState(false); // 授权额度
  const [tenLines, setTenLines] = useState(false); // 授权额度
  const [createing, setcCreateing] = useState(false);
  const [dping, setDping] = useState(false); // LSQ
  const [tening, setTenping] = useState(false); // ten

  useEffect(() => {
    ApiPoolDetail({ pid })
      .then((res) => {
        let temp = res || {};
        setPoolDetail({ ...temp, createaddr: temp.createaddr || '-2' });
      })
      .catch((err) => Toast.fail(err.msg));
  }, [pid]);

  // query transaction record
  const queryTranRecord = useCallback(
    (addr) => {
      if (addr.toLowerCase() === poolDetail.createaddr) {
        setLoading(true);
        ApiPoolProjectTraRecord({ pid: poolDetail.pid })
          .then((res) => {
            setRecordList(res.datas || []);
            setLoading(false);
          })
          .catch((err) => {
            Toast.info(err.msg);
            setLoading(false);
          });
      } else {
        ApiPoolTraRecord({ addr, pid: poolDetail.pid })
          .then((res) => {
            setRecordList(res.datas || []);
          })
          .catch((err) => {
            Toast.info(err.msg);
          });
      }
    },
    [poolDetail]
  );

  // wallet info
  useEffect(() => {
    if (!web3) return;
    const getAccount = async () => {
      const gfB = await defiUtil.getTenTokenBalanceOf(web3, account);
      console.log('gfB:', gfB);
      setGfBalance(Tool.fmtDec(web3.utils.fromWei(gfB || '0'), 4));

      // 获取名称
      // console.log(await defiUtil.getSymbol(web3, '0xb24f9c17b4d3b64354d58c15b18effe83606ab5a')); // token名称-参数token地址
      // console.log(await defiUtil.getSymbol(web3, '0x304B32d50c2827E4Be7958242ffF39B13CC1b685')); // pair名称-参数pair地址
    };
    getAccount();
  }, [web3, account]);

  // 初始查询结果
  useEffect(() => {
    if (!web3) return;
    async function func() {
      if (web3 && poolDetail.lptokenaddr && account) {
        // 链接成功判断是否授权
        let amount = await defiUtil.getAllowance(web3, poolDetail.lptokenaddr, account);
        if (Tool.GT(web3.utils.fromWei(amount || '0'), 0)) {
          setApprove(true); // 大于0-已授权
          queryTranRecord(account); // 查询记录
        }

        if (poolDetail.createaddr === account.toLowerCase()) {
          // 项目方质押余额
          let wmAmount = await defiUtil.getBalanceOf(web3, GF_ADDRESS, account);
          setUnlockWMAmount(Tool.fmtDec(web3.utils.fromWei(wmAmount || '0'), 4));
        } else {
          // 质押余额
          let wmAmount = await defiUtil.getBalanceOf(web3, poolDetail.lptokenaddr, account);
          setUnlockWMAmount(Tool.fmtDec(web3.utils.fromWei(wmAmount || '0'), 4));
        }

        // 用户在官方池子 可领取的TEN
        if (poolDetail.pid === P_ID) {
          const gfAmount = await defiUtil.getPendingTenByUser(web3, account);
          setGfReceive(Tool.fmtDec(web3.utils.fromWei(gfAmount || '0'), 4));
        } else {
          // 可领取的TEN --- 非官方池获取TEN可领取余额
          const gfAmount = await defiUtil.getPendingTen(web3, poolDetail.pid, account);
          console.log('gfAmount:', gfAmount);
          setGfReceive(Tool.fmtDec(web3.utils.fromWei(gfAmount || '0'), 4));
        }

        // 项目方余额
        const xmfB = await defiUtil.getProjectBalanceOf(web3, account, poolDetail.tokenaddr);
        setXmfBalance(Tool.fmtDec(web3.utils.fromWei(xmfB || '0'), 4));

        if (poolDetail.pid !== P_ID) {
          // 可领取项目方币
          let xmfAmount = await defiUtil.getPendingToken(web3, poolDetail.pid, account);
          setXmfReceive(Tool.fmtDec(web3.utils.fromWei(xmfAmount || '0'), 4));
        }

        // 质押金额
        if (poolDetail.pid === P_ID) {
          // 用户官方
          let zyBalanceObj = await defiUtil.getUserZYGfLPToken(web3, account);
          setZyBalance(Tool.fmtDec(web3.utils.fromWei(zyBalanceObj.amount || '0'), 4));
        } else {
          if (poolDetail.createaddr === account.toLowerCase()) {
            // 官方项目方
            let zyBalanceObj = await defiUtil.getProjectZYGfLPToken(web3, poolDetail.pid);
            setZyBalance(Tool.fmtDec(web3.utils.fromWei(zyBalanceObj.amount || '0'), 4));
          } else {
            // 用户项目方
            let zyBalanceObj = await defiUtil.getUserZYLPToken(web3, poolDetail.pid, account);
            setZyBalance(Tool.fmtDec(web3.utils.fromWei(zyBalanceObj.amount || '0'), 4));
          }
        }
      }
    }
    func();
  }, [web3, poolDetail, account, queryTranRecord]);

  useEffect(() => {
    if (!active) setApprove(false);
  }, [active]);

  // 授权
  function approveFunc() {
    if (web3) {
      setApproveStatus(true);
      defiUtil
        .approve(web3, poolDetail.lptokenaddr, account)
        .on('transactionHash', function (transactionHash) {})
        .on('receipt', (receipt) => {
          setApprove(true);
          setApproveStatus(false);
        })
        .on('error', (error) => {
          setApproveStatus(false);
        });
    }
  }
  // 获取
  async function gainFunc() {
    if (poolDetail.pid === P_ID) {
      if (Tool.LE(gfReceive, 0)) {
        Toast.info(t('pool.tip.no.gain'));
        return;
      }
      defiUtil.mineLPTen(web3, account).on('transactionHash', function (transactionHash) {
        setRecord({ type: t('pool.to.get'), state: 'PENDING', hash: transactionHash });
        setGainVisible(true);
      });
    } else {
      if (Tool.LE(gfReceive, 0) && Tool.LE(xmfReceive, 0)) {
        Toast.info(t('pool.tip.no.gain'));
        return;
      }
      defiUtil.mineLPToken(web3, account, poolDetail.pid).on('transactionHash', function (transactionHash) {
        setRecord({ type: t('pool.to.get'), state: 'PENDING', hash: transactionHash });
        setGainVisible(true);
      });
    }
  }

  // 解锁modal
  async function unlockWFunc() {
    // let amount = await defiUtil.getUserZYLPToken(web3, poolDetail.pid, account);
    // setZyBalance(web3.utils.fromWei(amount || 0));
    setUnlockW(true);
  }
  // 解锁提现
  async function goUnlockWFunc() {
    if (Tool.LE(withdrawAmount || 0, 0) || Tool.GT(withdrawAmount || 0, zyBalance || 0)) {
      Toast.info(t('pool.tip.no.balance'));
      return;
    }
    const resFunc = (hash) => {
      setUnlockW(false);
      setRecord({ type: t('details.unlock.lp'), amount: withdrawAmount, state: 'PENDING', hash });
      setTipTrading(true);
      queryTranRecord(account);
    };

    if (poolDetail.pid === P_ID) {
      // 官方解锁
      defiUtil.withdrawTenByUser(web3, account, web3.utils.toWei(withdrawAmount + '')).on('transactionHash', function (transactionHash) {
        console.log('unlock pending: ', transactionHash);
        resFunc(transactionHash || '');
      });
    } else {
      if (poolDetail.createaddr === account.toLowerCase()) {
        // 项目方解锁
        defiUtil.withdrawTenByProject(web3, account, poolDetail.pid, web3.utils.toWei(withdrawAmount + '')).on('transactionHash', function (transactionHash) {
          console.log('unlock pending: ', transactionHash);
          resFunc(transactionHash || '');
        });
      } else {
        // res = await defiUtil.withdrawLPToken(web3, account, poolDetail.pid, web3.utils.toWei(withdrawAmount + ''));
        defiUtil.withdrawLPToken(web3, account, poolDetail.pid, web3.utils.toWei(withdrawAmount + '')).on('transactionHash', function (transactionHash) {
          console.log('unlock pending: ', transactionHash);
          resFunc(transactionHash || '');
        });
      }
    }
  }

  // 质押modal
  async function unlockRFunc() {
    // let amount = await defiUtil.getBalanceOf(web3, poolDetail.lptokenaddr, account);
    // setUnlockRMAmount(Tool.fmtDec(web3.utils.fromWei(amount || '0'), 4));
    setUnlockR(true);
  }
  // 质押充值
  async function goUnlockRFunc() {
    if (Tool.LE(rechargeAmount || 0, 0) || Tool.GT(rechargeAmount || 0, unlockWMAmount || 0)) {
      Toast.info(t('pool.tip.no.balance'));
      return;
    }
    const resFunc = async (hash) => {
      setUnlockR(false);
      setRecord({ type: t('details.stake.lptoken'), amount: rechargeAmount, state: 'PENDING', hash });
      setTipTrading(true);
      queryTranRecord(account);
      // let zyBalanceObj = await defiUtil.getUserZYLPToken(web3, poolDetail.pid, account);
      // setZyBalance(web3.utils.fromWei(zyBalanceObj.amount || 0));
    };

    if (poolDetail.pid === P_ID) {
      // 官方质押
      defiUtil.depositTenByUser(web3, account, web3.utils.toWei(rechargeAmount + '')).on('transactionHash', function (transactionHash) {
        console.log('unlock pending: ', transactionHash);
        resFunc(transactionHash || '');
      });
    } else {
      if (poolDetail.createaddr === account.toLowerCase()) {
        // 项目方质押
        defiUtil.depositTenByProject(web3, account, poolDetail.pid, web3.utils.toWei(rechargeAmount + '')).on('transactionHash', function (transactionHash) {
          console.log('unlock pending: ', transactionHash);
          resFunc(transactionHash || '');
        });
      } else {
        defiUtil.depositLPToken(web3, account, poolDetail.pid, web3.utils.toWei(rechargeAmount + '')).on('transactionHash', function (transactionHash) {
          console.log('unlock pending: ', transactionHash);
          resFunc(transactionHash || '');
        });
      }
    }
  }

  return (
    <div className="pool-detail-wrap">
      <div className="info-box base">
        <div className="logo-box">
          {poolDetail.pid === '-2' ? (
            <img src="/images/logo/tenet.png" alt="" className="logo" />
          ) : (
            <Image width={36} height={36} src={COIN_LOGO_URL.replace('[address]', poolDetail.tokenaddr || '')} fallback={DEFAULT_IMG} prefixCls="logo" />
          )}
          {poolDetail.pid === '-2' && <img src="/images/icon/v.png" className="v" alt="" />}
        </div>
        <div className="detail">
          <h3>{poolDetail.poolname || ''}</h3>
          <p>
            {t('pool.earn')} {`${poolDetail.pid !== P_ID && poolDetail.tokensymbol ? poolDetail.tokensymbol + ' +' : ''} TEN`}
          </p>
        </div>
        <div className="btn-box">
          <a href={poolDetail.web} className="btn-theme" target="_blank" rel="noopener noreferrer">
            Website <img src={require('../../assets/icon/direction-right.svg')} alt="" />
          </a>
        </div>
      </div>
      {poolDetail.descinfo && (
        <div className="info-box base-desc">
          <p>{poolDetail.descinfo || ''}</p>
        </div>
      )}

      <div className="card-box">
        {poolDetail.pid !== P_ID && (
          <div className="card-item">
            <Image width={36} height={36} src={COIN_LOGO_URL.replace('[address]', poolDetail.lptokenaddr || '')} fallback={DEFAULT_IMG} prefixCls="logo" />
            <div className="card-info">
              <label htmlFor="">{t('details.price', { p: poolDetail.tokensymbol || '' })}</label>
              <b>${Tool.fmtDec(poolDetail.tokenusdt || 0, 8)}</b>
            </div>
          </div>
        )}
        <div className="card-item">
          <img src="/images/logo/tenet.png" alt="" className="logo" />
          <div className="card-info">
            <label htmlFor="">{t('details.price', { p: 'TEN' })}</label>
            <b>${Tool.fmtDec(poolDetail.tentokenprice || 0, 2)}</b>
          </div>
        </div>
        <div className="card-item">
          <img src={`/images/logo/${poolDetail.lptokenfrom}.png`} alt="" className="logo" />
          <div className="card-info">
            <label htmlFor="">{poolDetail.lptokenfrom || ''}</label>
            <div className="copy-box">
              <a
                className="one-txt-cut"
                href={`${PLATFORM[poolDetail.lptokenfrom] ? PLATFORM[poolDetail.lptokenfrom].pairUrl : ''}${poolDetail.lptokenaddr || ''}`}
                title={poolDetail.tokenaddr || ''}
                target="_blank"
                rel="noopener noreferrer"
              >
                {poolDetail.lptokenaddr}
              </a>
              <CopyToClipboard text={poolDetail.lptokenaddr || ''} onCopy={() => Toast.info(t('copy'))}>
                <span>
                  <CopyOutlined />
                </span>
              </CopyToClipboard>
            </div>
          </div>
        </div>
        <div className="card-item" style={poolDetail.pid === P_ID ? { marginRight: 0 } : {}}>
          <Image width={36} height={36} src={COIN_LOGO_URL.replace('[address]', poolDetail.lptokenaddr || '')} fallback={DEFAULT_IMG} prefixCls="logo" />
          <div className="card-info">
            <label htmlFor="">{t('details.token.address', { p: poolDetail.tokensymbol || '' })}</label>
            <div className="copy-box">
              <a
                className="one-txt-cut"
                href={`${PLATFORM[poolDetail.lptokenfrom] ? PLATFORM[poolDetail.lptokenfrom].tokenUrl : ''}${poolDetail.tokenaddr || ''}`}
                title={poolDetail.tokenaddr || ''}
                target="_blank"
                rel="noopener noreferrer"
              >
                {poolDetail.tokenaddr}
              </a>
              <CopyToClipboard text={poolDetail.tokenaddr || ''} onCopy={() => Toast.info(t('copy'))}>
                <span>
                  <CopyOutlined />
                </span>
              </CopyToClipboard>
            </div>
          </div>
        </div>
      </div>

      <div className="table-box">
        <div className="item">
          <div className="left">{t('home.rol')}</div>
          <div className="right">
            <p className="title">
              {Tool.fmtDec(Tool.mul(Tool.mul(poolDetail.ROI || 0, 100), 24 * 365), 2)}% {t('pool.yearly')}
            </p>
            <p className="desc">
              {Tool.fmtDec(Tool.mul(poolDetail.ROI || 0, 100), 2)}% {t('home.hourly')}
            </p>
            <p className="desc">
              {Tool.fmtDec(Tool.mul(Tool.mul(poolDetail.ROI || 0, 100), 24), 2)}% {t('home.daily')}
            </p>
          </div>
        </div>
        <div className="item">
          <div className="left">{t('pool.starting.height')}</div>
          <div className="right">
            <p className="title">#{poolDetail.startblock || 0}</p>
            <p className="desc">
              {Tool.LT(poolDetail.blocknumber || 0, poolDetail.startblock || 0)
                ? moment(parseInt(Tool.plus(Tool.mul(Tool.sub(poolDetail.startblock || 0, poolDetail.blocknumber || 0), 15 * 1000), new Date().getTime())))
                    // .utc()
                    // .add(8, 'hours')
                    .format('YYYY-MM-DD HH:mm:ss')
                : moment(parseInt(Tool.sub(new Date().getTime(), Tool.mul(Tool.sub(poolDetail.blocknumber || 0, poolDetail.startblock || 0), 15 * 1000))))
                    // .utc()
                    // .add(8, 'hours')
                    .format('YYYY-MM-DD HH:mm:ss')}
            </p>
          </div>
        </div>
        <div className="item">
          <div className="left">{t('pool.closing.heighttime')}</div>
          <div className="right">
            <p className="title">#{poolDetail.endblock || 0}</p>
            <p className="desc">
              {Tool.LT(poolDetail.blocknumber || 0, poolDetail.endblock || 0)
                ? moment(parseInt(Tool.plus(Tool.mul(Tool.sub(poolDetail.endblock || 0, poolDetail.blocknumber || 0), 15 * 1000), new Date().getTime())))
                    // .utc()
                    // .add(8, 'hours')
                    .format('YYYY-MM-DD HH:mm:ss')
                : moment(parseInt(Tool.sub(new Date().getTime(), Tool.mul(Tool.sub(poolDetail.blocknumber || 0, poolDetail.endblock || 0), 15 * 1000))))
                    // .utc()
                    // .add(8, 'hours')
                    .format('YYYY-MM-DD HH:mm:ss')}
            </p>
          </div>
        </div>
        <div className="item">
          <div className="left">{t('pool.reward')}</div>
          {Tool.LE(poolDetail.blocknumber || 0, poolDetail.tokenbonusendblock || 0) ? (
            <div className="right">
              <p className="title">
                {Tool.fmtDec(poolDetail.rewardperblock || 0, 4)}&nbsp;<span className="tag">{poolDetail.tokenbonusmul || 0}x</span>
              </p>
              <p className="desc">{poolDetail.tokensymbol || ''}</p>
              <p className="desc">
                {t('pool.remaining.title')}
                {Tool.fmtShowTime(Tool.toNumber(Tool.mul(Tool.sub(poolDetail.tokenbonusendblock || 0, poolDetail.blocknumber || 0), 15)))}
              </p>
            </div>
          ) : (
            <div className="right">
              <p className="title">{Tool.fmtDec(poolDetail.rewardperblock || 0, 4)}</p>
              <p className="desc">{poolDetail.tokensymbol || ''}</p>
            </div>
          )}
        </div>
        <div className="item">
          <div className="left">STAKED</div>
          <div className="right">
            <p className="title">{Tool.fmtDec(poolDetail.lptokentotalamount || 0, 4)}</p>
            <p className="desc">LP Tokens</p>
          </div>
        </div>
        <div className="item">
          <div className="left">{t('pool.lmrewards')}</div>
          <div className="right">
            <p className="title">{Tool.fmtDec(poolDetail.lmreward || 0, 4)}</p>
            <p className="desc">TEN</p>
          </div>
        </div>
        <div className="item">
          <div className="left">{t('pool.pools')}</div>
          <div className="right">
            <p className="title">{Tool.fmtDec(poolDetail.tokenamount || 0, 2)}</p>
            <p className="desc">{poolDetail.tokensymbol || ''}</p>
          </div>
        </div>
        <div className="item">
          <div className="left">{t('pool.remaining.aut')}</div>
          <div className="right">
            <p className="title">{Tool.fmtDec(poolDetail.leftamount || 0, 2)}</p>
            <p className="desc">{poolDetail.tokensymbol || ''}</p>
          </div>
        </div>
      </div>

      {(Tool.LE(poolDetail.blocknumber || 0, poolDetail.bonusendblock || 0) || poolDetail.pid === P_ID) && (
        <div className="info-box tip-rule">
          <div>
            <span role="img" aria-labelledby="panda1">
              🌈
            </span>
          </div>
          <div className="right">
            {Tool.LE(poolDetail.blocknumber || 0, poolDetail.bonusendblock || 0) && (
              <p>
                {t('details.mining.with', {
                  p: poolDetail.bonusmultipler || 0,
                  p1: `#${poolDetail.startblock || 0}`,
                  p2: `${
                    Tool.LT(poolDetail.blocknumber || 0, poolDetail.endblock || 0)
                      ? moment(parseInt(Tool.plus(Tool.mul(Tool.sub(poolDetail.endblock || 0, poolDetail.blocknumber || 0), 15 * 1000), new Date().getTime())))
                          // .utc()
                          // .add(8, 'hours')
                          .format('YYYY-MM-DD HH:mm:ss')
                      : moment(parseInt(Tool.sub(new Date().getTime(), Tool.mul(Tool.sub(poolDetail.blocknumber || 0, poolDetail.endblock || 0), 15 * 1000))))
                          // .utc()
                          // .add(8, 'hours')
                          .format('YYYY-MM-DD HH:mm:ss')
                  } UTC+8`,
                })}
              </p>
            )}
            {poolDetail.pid === P_ID && (
              <p>
                {t('home.official.pool', {
                  p: Tool.fmtDec(
                    Tool.mul(100, Tool.EQ(poolDetail.totalallocpoint || 0, 0) ? 0 : Tool.div(poolDetail.allocpoint || 0, poolDetail.totalallocpoint || 0)),
                    2
                  ),
                  p1: Tool.fmtDec(
                    Tool.mul(
                      100,
                      Tool.sub(1, Tool.EQ(poolDetail.totalallocpoint || 0, 0) ? 0 : Tool.div(poolDetail.allocpoint || 0, poolDetail.totalallocpoint || 0))
                    ),
                    2
                  ),
                  p2: Tool.fmtDec(
                    Tool.mul(
                      poolDetail.rewardperblock || 0,
                      Tool.EQ(poolDetail.totalallocpoint || 0, 0) ? 0 : Tool.div(poolDetail.allocpoint || 0, poolDetail.totalallocpoint || 0)
                    ),
                    4
                  ),
                  p3: Tool.fmtDec(
                    Tool.mul(
                      poolDetail.rewardperblock || 0,
                      Tool.sub(1, Tool.EQ(poolDetail.totalallocpoint || 0, 0) ? 0 : Tool.div(poolDetail.allocpoint || 0, poolDetail.totalallocpoint || 0))
                    ),
                    4
                  ),
                })}
              </p>
            )}
          </div>
        </div>
      )}

      <div className="card-box wallet-box">
        {poolDetail.createaddr !== account.toLowerCase() && (
          <Fragment>
            <div className="card-item">
              <img src="/images/logo/tenet.png" alt="" className="logo" />
              <div className="card-info">
                <span className="title">{active ? `${Tool.fmtDec(gfReceive || 0, 4)}/${Tool.fmtDec(gfBalance || 0, 4)}` : 'Locked'}</span>
                <label htmlFor="">{t('details.balance', { p: 'TEN' })}</label>
              </div>
            </div>
            {poolDetail.pid !== P_ID && (
              <div className="card-item">
                <Image width={36} height={36} src={COIN_LOGO_URL.replace('[address]', poolDetail.tokenaddr || '')} fallback={DEFAULT_IMG} prefixCls="logo" />
                <div className="card-info">
                  <span className="title">{active ? `${Tool.fmtDec(xmfReceive || 0, 4)}/${Tool.fmtDec(xmfBalance || 0, 4)}` : 'Locked'}</span>
                  <label htmlFor="">{t('details.balance', { p: poolDetail.tokensymbol || '' })}</label>
                </div>
              </div>
            )}
          </Fragment>
        )}
        <div className="card-item">
          <Image width={36} height={36} src={COIN_LOGO_URL.replace('[address]', poolDetail.lptokenaddr || '')} fallback={DEFAULT_IMG} prefixCls="logo" />
          <div className="card-info">
            <span className="title">{active ? `${Tool.fmtDec(zyBalance || 0, 4)}/${Tool.fmtDec(unlockWMAmount || 0, 4)}` : 'Locked'}</span>

            {poolDetail.createaddr === account.toLowerCase() ? (
              <label htmlFor="">
                {t('details.stake.wallet', { p: poolDetail.createaddr === account.toLowerCase() ? 'TEN/ETH' : poolDetail.pairname || '' })}
              </label>
            ) : (
              <label htmlFor="">{t('details.stake.wallet', { p: poolDetail.pairname || '' })}</label>
            )}

            {poolDetail.createaddr !== account.toLowerCase() && (
              <Fragment>
                <span className="title1">{t('details.expected', { p: poolDetail.createaddr === account.toLowerCase() ? 'TEN' : poolDetail.tokensymbol })}</span>
                <b>
                  {Tool.fmtDec(
                    Tool.mul(
                      Tool.mul(
                        Tool.EQ(poolDetail.lptokentotalamount || 0, 0) ? 0 : Tool.div(zyBalance || 0, poolDetail.lptokentotalamount || 0),
                        poolDetail.pid === '-2'
                          ? Tool.fmtDec(
                              Tool.mul(
                                poolDetail.rewardperblock || 0,
                                Tool.EQ(poolDetail.totalallocpoint || 0, 0) ? 0 : Tool.div(poolDetail.allocpoint || 0, poolDetail.totalallocpoint || 0)
                              ),
                              4
                            )
                          : poolDetail.rewardperblock || 0
                      ),
                      240 * 24
                    ),
                    4
                  )}
                  <img src="/images/pool/unit.png" alt="" />
                </b>
              </Fragment>
            )}
          </div>
        </div>
      </div>

      {approve && (
        <Fragment>
          <div className="title-box">
            <img src="/images/icon/trangle.png" alt="" className="icon-trangle" />
            <h4>{t('title.pool.detail')}</h4>
          </div>
          <div className="record-box">
            <div className="record-title">
              <div className="column">{t('details.types')}</div>
              <div className="column">{t('pool.block.height')}</div>
            </div>
            {recordList.map((item) => {
              return (
                <div className="record-item">
                  <a href={`${TX_ETHERSCAN_URL}${item.hash}`} target="_blank" rel="noopener noreferrer" className="column link">
                    {item.methord}
                    <div className="img-box">
                      <img src={dr} alt="" />
                    </div>
                  </a>
                  <div className="column">{item.blocknumber}</div>
                </div>
              );
            })}
          </div>
          {loading ? <LoadingComponent /> : !recordList.length && <EmptyData />}
        </Fragment>
      )}

      {poolDetail.createaddr !== account.toLowerCase() && (
        <div className="info-box base-desc">
          <p>{t('details.gain.tip')}</p>
          <p>{t('details.unlock.tip')}</p>
        </div>
      )}

      <div className="btn-fix">
        {active ? (
          poolDetail.createaddr === account.toLowerCase() ? (
            <Fragment>
              <button className="btn-theme" onClick={() => unlockRFunc()}>
                {t('details.btn.pledge')}
              </button>
              <button className="btn-theme" onClick={() => unlockWFunc()}>
                {t('details.unlock.title')}
              </button>
            </Fragment>
          ) : approve ? (
            <Fragment>
              <button className="btn-theme" onClick={() => gainFunc()}>
                {t('details.receive')}
              </button>
              <button className="btn-theme" onClick={() => unlockWFunc()}>
                {t('details.unlock.title')}
              </button>
              <button className="btn-yellow" onClick={() => unlockRFunc()}>
                {t('details.stake.lptoken')}
              </button>
            </Fragment>
          ) : (
            <Fragment>
              <button className="btn-theme" onClick={() => approveFunc()} disabled={approveStatus}>
                {`${t('details.authorize')}${approveStatus ? '...' : ''}`}
              </button>
              <button className="btn-theme" onClick={() => gainFunc()}>
                {t('details.receive')}
              </button>
            </Fragment>
          )
        ) : (
          <button className="btn-theme" onClick={() => appContext.toggleWalletVisible(true)}>
            {t('btn.unlock')}
          </button>
        )}
      </div>

      {/* 解锁 */}
      <Modal title={t('details.unlock.token', { p: 'token' })} visible={unlockW} onClose={() => setUnlockW(false)} transparent className="tip-modal">
        <div className="confirm-box">
          <div className="max-unlock">
            <input
              type="text"
              placeholder={t('details.stake.number')}
              value={withdrawAmount}
              onChange={(e) => {
                let val = e.target.value;
                setWithdrawAmount(val === '' ? '' : Tool.numFmt(val, 4));
              }}
            />
            <div className="btn-max" onClick={() => setWithdrawAmount(zyBalance)}>
              Max
            </div>
          </div>
          <div className="available">
            {t('details.available')}: {zyBalance}
          </div>
          <div className="btn-box">
            <button className="btn-theme" onClick={() => setUnlockW(false)}>
              {t('but.cancel')}
            </button>
            <button className="btn-theme" onClick={() => goUnlockWFunc()}>
              {t('but.confirm')}
            </button>
          </div>
        </div>
      </Modal>

      {/* 质押 */}
      <Modal title={t('details.stake.token', { p: 'token' })} visible={unlockR} onClose={() => setUnlockR(false)} transparent className="tip-modal">
        <div className="confirm-box">
          <div className="max-unlock">
            <input
              type="text"
              placeholder={t('details.stake.number')}
              value={rechargeAmount}
              onChange={(e) => {
                let val = e.target.value;
                setRechargeAmount(val === '' ? '' : Tool.numFmt(val, 4));
              }}
            />
            <div className="btn-max" onClick={() => setRechargeAmount(Tool.fmtDec(unlockWMAmount || 0, 4))}>
              Max
            </div>
          </div>
          <div className="available">
            {t('details.available')}: {Tool.fmtDec(unlockWMAmount || 0, 4)}
          </div>
          <div className="btn-box">
            <button className="btn-theme" onClick={() => setUnlockR(false)}>
              {t('but.cancel')}
            </button>
            <button className="btn-theme" onClick={() => goUnlockRFunc()}>
              {t('but.confirm')}
            </button>
          </div>
        </div>
      </Modal>

      {/* 交易结果提示 */}
      <Modal title={t('message.transaction')} visible={tipTrading} onClose={() => setTipTrading(false)} transparent className="tip-modal">
        <ul className="tip-con">
          <li>
            <div className="data-title">{t('details.types')}</div>
            <div className="data">{record.type}</div>
          </li>
          <li>
            <div className="data-title">{t('details.amount')}</div>
            <div className="data">
              <p>{record.amount}</p>
            </div>
          </li>
          <li>
            <div className="data-title">{t('details.status')}</div>
            <div className="data">{record.state}</div>
          </li>
          <li>
            <div className="data-title">{t('details.Hash')}</div>
            <div className="data">
              <a href={`${TX_ETHERSCAN_URL}${record.hash}`} target="_blank" rel="noopener noreferrer" className="one-txt-cut">
                {record.hash}
              </a>
              <CopyToClipboard text={record.hash || ''} onCopy={() => Toast.info(t('copy'))}>
                <span>
                  <CopyOutlined />
                </span>
              </CopyToClipboard>
            </div>
          </li>
          <div className="btn-box">
            <button className="btn-yellow" onClick={() => setTipTrading(false)}>
              {t('but.I.got.it')}
            </button>
          </div>
        </ul>
      </Modal>

      {/* 收获 */}
      <Modal title={t('message.transaction')} visible={gainVisible} onClose={() => setGainVisible(false)} transparent className="tip-modal">
        <ul className="tip-con">
          <li>
            <div className="data-title">{t('details.types')}</div>
            <div className="data">{record.type}</div>
          </li>
          <li>
            <div className="data-title">{t('details.status')}</div>
            <div className="data">{record.state}</div>
          </li>
          <li>
            <div className="data-title">{t('details.Hash')}</div>
            <div className="data">
              <a href={`${TX_ETHERSCAN_URL}${record.hash}`} target="_blank" rel="noopener noreferrer" className="one-txt-cut">
                {record.hash}
              </a>
              <CopyToClipboard text={record.hash || ''} onCopy={() => Toast.info(t('copy'))}>
                <span>
                  <CopyOutlined />
                </span>
              </CopyToClipboard>
            </div>
          </li>
          <div className="btn-box">
            <button className="btn-yellow" onClick={() => setGainVisible(false)}>
              {t('but.I.got.it')}
            </button>
          </div>
        </ul>
      </Modal>

      {/* 提交成功 */}
      <Modal visible={submitTrading} className="pool-create-modal" transparent>
        <div className="title">{t(['message.transaction', ''])}</div>
        <div className="content">
          <div className="modalInfo-content-body">
            <ul className="successful-deal">
              <li>
                <div className="data-title">{t(['details.types', ''])}</div>
                <div className="data">{t(['title.create.pool', ''])}</div>
              </li>
              <li>
                <div className="data-title">{t(['details.status', ''])}</div>
                <div className="data">Pending</div>
              </li>
              <li>
                <div className="data-title">{t(['details.Hash', ''])}</div>
                <div className="data">
                  {/* <Paragraph copyable={{ text: hash }}> */}
                  <a href={`${TX_ETHERSCAN_URL}${record.hash}`} target="_blank" rel="noopener noreferrer">
                    <div className="eth-hash">{record.hash || '--'}</div>
                  </a>
                  <CopyToClipboard text={record.hash || ''} onCopy={() => Toast.info(t('copy'))}>
                    <span>
                      <CopyOutlined />
                    </span>
                  </CopyToClipboard>
                  {/* </Paragraph> */}
                </div>
              </li>
            </ul>
          </div>
          <div className="btn-box">
            <button
              className="btn-theme"
              onClick={() => {
                // history.push(`/pool/list`);
                setSubmitTrading(false);
              }}
            >
              {t(['but.I.got.it', ''])}
            </button>
          </div>
        </div>
      </Modal>

      {/* 兑换 */}
      <Modal visible={exchangeLp} className="pool-create-modal" transparent>
        <div className="title">{t(['pool.but.create', ''])}</div>
        <div className="content">
          <div className="close-box" onClick={() => setExchangeLp(false)}>
            <CloseOutlined />
          </div>
          <div className="content-body">
            <p>{t(['pool.predeposit.token', ''])}</p>
            <div className="content">
              <p>
                {'' || '--'}:<span>{'' || 0}</span>
              </p>
              TEN-ETH LP Tokens：<span>{'' || 0}</span>
            </div>
          </div>
          <div className="create-box">
            <Fragment>
              {lines && tening ? (
                <div className={lines ? 'btn-box-click anim-fade-out' : 'btn-box-click'}>
                  {dping ? (
                    <Button className="but-cancel click-but-waitingt">
                      <p> {t('details.authorize')}...</p>
                      <p>{'' || '--'}</p>
                    </Button>
                  ) : (
                    <Button
                      className={lines ? 'but-cancel click-but-active' : 'but-cancel click-but'}
                      onClick={() => {
                        // approveBalanceFunc();
                      }}
                      disabled={lines}
                    >
                      <p>
                        {lines ? <CheckCircleOutlined /> : ''} {lines ? t('pool.authorized') : t('details.authorize')}
                      </p>
                      <p>{'' || '--'}</p>
                    </Button>
                  )}
                  {tening ? (
                    <Button className="but-confirm click-but-waitingt">
                      <p> {t(['details.authorize', ''])}...</p>
                      <p>TEN-ETH LP Tokens</p>
                    </Button>
                  ) : (
                    <Button
                      className={tenLines ? 'but-confirm click-but-active' : 'but-confirm click-but'}
                      onClick={() => {
                        approveFunc();
                      }}
                      disabled={tenLines}
                    >
                      <p>
                        {tenLines ? <CheckCircleOutlined /> : ''} {tenLines ? t(['pool.authorized', '']) : t(['details.authorize', ''])}
                      </p>
                      <p>TEN-ETH LP Tokens</p>
                    </Button>
                  )}
                </div>
              ) : (
                ''
              )}
              {createing ? (
                <Button className="click-but-know click-but-waiting">
                  <p>{t(['pool.but.create', ''])}</p> ...
                </Button>
              ) : (
                <Button
                  className={tenLines && lines ? 'click-but-know ' : 'click-but-know click-but-disabled'}
                  onClick={() => {
                    console.log('兑换');
                  }}
                  disabled={!tenLines || !lines}
                >
                  {t(['pool.but.create', ''])}
                </Button>
              )}
            </Fragment>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PoolDetail;
