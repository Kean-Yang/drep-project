import React, { useEffect, useState, Fragment, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { List, InputItem, Toast, Checkbox, TextareaItem, Modal, Button } from 'antd-mobile';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ExclamationCircleOutlined, ArrowRightOutlined, CheckCircleOutlined, CloseOutlined, CopyOutlined } from '@ant-design/icons';
import './Create.less';
import { createForm } from 'rc-form';
import * as Tools from '../../utils/Tools';
import DefiUtil from '../../utils/DefiUtil';
import { Redirect, useHistory } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';
import AppContext from '../../state';
import moment from 'moment';
import * as HttpUtil from '../../service/Pool';
import { GF_ADDRESS, TX_ETHERSCAN_URL, ETH_TEN_UNIV2_LPTOKEN } from '../../constants';
import config from '../../utils/Config';
const AgreeItem = Checkbox.AgreeItem;

const PoolCreate = (props) => {
  const { t } = useTranslation();
  const [blackHeight, setBlackHeight] = useState(1); //当前区块
  const averageBlockTime = 15;
  const appContext = useContext(AppContext);
  const context = useWeb3React();
  const { active } = context;
  const web3 = appContext.web3;
  const history = useHistory();
  const [rewardswitch, setRewardSwitch] = useState(false);
  const [tipPair, setTipPair] = useState(false);
  const [createPoll, setCreatePoll] = useState(false);
  const [lmMining, setLpMining] = useState(1);
  const [latestblack, setLatestBlack] = useState(false); // 是否结束区块
  const [firstMineReward, setFirstMineReward] = useState(1); // 头矿
  // const [getpairdata, setPairdata] = useState(''); // 获取pair
  const [pair, setPair] = useState('');
  const [userAddr, setUserAddr] = useState(''); // 用户地
  // const [tokenAddr, setTokenAddr] = useState('');
  // 获取奖励地址
  const [tokenAddress, setTokenAddress] = useState('');
  // 头矿奖励
  const [tokenBonusmul, setTokenbonusmul] = useState(''); //
  const [priorEndBlock, setPriorEndBlock] = useState(''); // 头矿结束高度、几个区块结束铜矿奖励
  // const [startBlackHeight, setStartBlackHeight] = useState('');
  // const [endBlackHeight, setEndBlackHeight] = useState('');
  const [blockReward, setBlockReward] = useState('');
  const [totalPools, setTotalPools] = useState(0);
  const [startClosTime, setStartClosTime] = useState('');
  // const [stakeNumber, setStakeNumber] = useState(0); // 质押lp token number
  const [lpstakeNumber, setlpStakeNumber] = useState(0); // 质押lp token
  const [lines, setLines] = useState(false); // 授权额度
  const [tenLines, setTenLines] = useState(false); // 授权额度
  // const [fromData, setFromData] = useState(false); // 表单数据
  const [calculateEndheight, steCalculateEndheight] = useState(0); //
  const [multiple, setMultiple] = useState(0);
  const [hash, setHash] = useState('');
  const [tipTrading, setTipTrading] = useState(false);
  const [createing, setcCreateing] = useState(false);
  const [dping, setDping] = useState(false); // LSQ
  const [tening, setTenping] = useState(false); // ten
  const [bonusBalance, setBonusBalance] = useState(0); // 奖励地址余额
  const [bonuseEndtime, setBonuseEndtime] = useState(0); // 头矿结束时间
  const [lpTokenAmount, setLpTokenAmount] = useState(''); //
  const [startBlock, setStartBlock] = useState(''); //
  const [inspection, setInspection] = useState(false); //
  function getPair() {
    console.log(props.form.getFieldsValue().lptokenaddr);

    // if (props.form.getFieldsValue().lptokenaddr) {
    DefiUtil.getPolllName(web3, props.form.getFieldsValue().lptokenaddr)
      .then((res) => {
        setPair(res || '');
      })
      .catch(() => {
        Toast.info(t(['message.not.address.token.w']), 1);
      });
    // } else {
    //   Toast.info(t(['message.perfect.information']), 1);
    // }
  }

  async function getTokenAddress() {
    console.log(props.form.getFieldsValue().tokenaddr);
    if (props.form.getFieldsValue().tokenaddr === '' || !props.form.getFieldsValue().tokenaddr) {
      Toast.info(t(['message.perfect.information', '']), 1);
    } else {
      web3 &&
        (await DefiUtil.getSymbol(web3, props.form.getFieldsValue().tokenaddr)
          .then((res) => {
            console.log(res);
            setTokenAddress(res || '');
            getAllowanceFun();
            getAllowanceOfficialFun();
          })
          .catch(() => {
            Toast.info(t(['message.not.address.token.w']), 1);
          }));
    }
  }

  function getEndBlackHeight() {
    if (props.form.getFieldsValue().endBlock && startBlock) {
      if (latestblack ? blackHeight : startBlock || 0 >= blackHeight) {
        steCalculateEndheight(Tools.plus(latestblack ? blackHeight : startBlock || 0, props.form.getFieldsValue().endBlock || 0));
        console.log(Tools.plus(latestblack ? blackHeight : startBlock || 0, props.form.getFieldsValue().endBlock || 0));
        getStartClosTime();
      } else {
        Toast.info(t(['pool.from.startingsh']), 1);
      }
    } else {
      Toast.info(t(['message.perfect.information']), 1);
    }
  }

  // 开始结束时间
  async function getStartClosTime() {
    if (startBlock && props.form.getFieldsValue().endBlock) {
      console.log(
        Tools.plus(Tools.mul(Tools.sub(latestblack ? blackHeight : startBlock || 0, blackHeight || 0), averageBlockTime * 1000), new Date().getTime())
      );
      console.log(
        moment(
          parseInt(
            Number(
              Tools.plus(Tools.mul(Tools.sub(latestblack ? blackHeight : startBlock || 0, blackHeight || 0), averageBlockTime * 1000), new Date().getTime())
            )
          )
        ).format('YYYY-MM-DD HH:mm')
      );
      console.log(await getBlocktime(latestblack ? blackHeight : startBlock || 0));
      let startTime = Tools.LT(blackHeight || blackHeight, latestblack ? blackHeight : startBlock || 0)
        ? Tools.plus(Tools.mul(Tools.sub(latestblack ? blackHeight : startBlock || 0, blackHeight || 0), averageBlockTime * 1000), new Date().getTime())
        : (await getBlocktime(latestblack ? blackHeight || 0 : startBlock || 0)) || 0;

      let endTime = Tools.LT(blackHeight || 0, Tools.plus(latestblack ? blackHeight : startBlock || 0, props.form.getFieldsValue().endBlock))
        ? Tools.plus(
            Tools.mul(
              Tools.sub(Tools.plus(props.form.getFieldsValue().endBlock, latestblack ? blackHeight : startBlock || 0), blackHeight || 0),
              averageBlockTime * 1000
            ),
            new Date().getTime()
          )
        : (await getBlocktime(Tools.plus(latestblack ? blackHeight : startBlock || 0, props.form.getFieldsValue().endBlock))) || 0;
      // console.log(startTime, endTime);
      setStartClosTime(`${moment(parseInt(Number(startTime))).format('YYYY-MM-DD HH:mm')} - ${moment(parseInt(endTime)).format('YYYY-MM-DD HH:mm')}`);
    } else {
      Toast.info(t(['message.perfect.information']), 1);
    }
  }

  //矿池总量
  function getTotalPools() {
    // 总量=头矿区块数*头矿奖励+(总区块数-头矿区块数)*区块奖励
    if (blockReward && props.form.getFieldsValue().endBlock) {
      const totalPoolsDate = Tools.plus(
        Tools.mul(priorEndBlock || 0, tokenBonusmul * blockReward || 0),
        Tools.mul(Tools.sub(props.form.getFieldsValue().endBlock || 0, priorEndBlock || 0), blockReward || 0)
      );
      setTotalPools(totalPoolsDate);
    } else {
      Toast.info(t(['message.perfect.information']), 1);
    }
  }

  function getHeadtime() {
    // const time = Tools.plus(
    //   Tools.plus(Tools.mul(Tools.sub(latestblack ? blackHeight : fromData.startBlock || startBlock') || 0, blackHeight || 0), averageBlockTime * 1000), new Date().getTime()),
    //   priorEndBlock * averageBlockTime
    // );
    // setBonuseEndtime(moment(parseInt(time)).format('YYYY-MM-DD HH:mm'));
    console.log(startClosTime);
    console.log(Tools.mul(Number(priorEndBlock) || 0, averageBlockTime * 1000));
    console.log(moment(startClosTime.split(' - ')[0] || 0).valueOf());

    const time = Tools.plus(Tools.mul(Number(priorEndBlock) || 0, averageBlockTime * 1000), moment(startClosTime.split(' - ')[0] || 0).valueOf());
    setBonuseEndtime(moment(parseInt(time)).format('YYYY-MM-DD HH:mm'));
  }

  async function getAllowanceFun() {
    if (web3) {
      let amount = await DefiUtil.getAllowance(web3, props.form.getFieldsValue().tokenaddr, userAddr);
      // const balance = await DefiUtil.getBalanceOf(web3, GF_ADDRESS, fromData.tokenAddr || props.form.getFieldsValue().tokenaddr'));
      const balance = await DefiUtil.getBalanceOf(web3, props.form.getFieldsValue().tokenaddr, userAddr);
      let temp = await DefiUtil.fmtUnitDiv(web3, balance, props.form.getFieldsValue().tokenaddr);
      setBonusBalance(Tools.fmtDec(temp, 6));
      setLines(Tools.GT(amount || 0, 0));
    }
  }
  async function getBlocktime(startBlackHeight) {
    if (web3) {
      let obj = await web3.eth.getBlock(startBlackHeight);
      return obj ? obj.timestamp * 1000 : '' || 0;
    }
  }
  async function getAllowanceOfficialFun() {
    if (web3) {
      let amount = await DefiUtil.getAllowance(web3, GF_ADDRESS, userAddr);
      setTenLines(Tools.GT(amount || 0, 0));
    }
  }

  async function addPool(
    web3,
    userAddress,
    projectLptokenContractAddress,
    projectTokenContractAddress,
    endBlockOffset,
    tokenPerBlock,
    totalPools,
    createPollId,
    options = {}
  ) {
    try {
      var o = options || {};
      var startBlock = o.startBlock || 0;
      var tokenBonusEndBlockOffset = o.priorEndBlock || 0;
      var tokenBonusMultipler = o.tokenBonusmul || 1;
      var depositAmount = o.depositAmount || 0;
      var digits = await DefiUtil.getDigits(web3, projectTokenContractAddress);
      let count = '0';
      for (var i = 1; i < Number(digits); i++) {
        var test = '0';
        count = count + test;
      }
      var coreContract = new web3.eth.Contract(config.tenet_abi, config.tenet_contract_address);
      return coreContract.methods
        .add(
          projectLptokenContractAddress,
          projectTokenContractAddress,
          !/(^[1-9]\d*$)/.test(totalPools) ? Tools.mul(Number(totalPools), Number(`1${count}`)) + '' : totalPools + count,
          startBlock + '',
          endBlockOffset + '',
          !/(^[1-9]\d*$)/.test(tokenPerBlock) ? Tools.mul(Number(tokenPerBlock), Number(`1${count}`)) + '' : tokenPerBlock + count,
          tokenBonusEndBlockOffset + '',
          tokenBonusMultipler + '',
          web3.utils.toWei(String(depositAmount || 0), 'ether') + ''
        )
        .send({
          from: userAddress,
        })
        .on('error', function (error) {
          console.log('invoke coreContract.add error: ', error);
          return error;
        })
        .on('transactionHash', function (transactionHash) {
          console.log('coreContract.add pending ', transactionHash);
          // if (createPollId)
          HttpUtil.ApiAddpoolPending({ id: createPollId || '', hash: transactionHash });
          setcCreateing(true);
          setHash(transactionHash);
          setCreatePoll(false);
          setTipTrading(true);
        });
    } catch (error) {
      console.error('addPool:', error);
    }
  }
  function createPool() {
    const param = {
      lptokenfrom: props.form.getFieldsValue().lptokenfrom || 'Uniswap',
      lptokenaddr: props.form.getFieldsValue().lptokenaddr || pair,
      lptokenamount: lpTokenAmount || 0,
      tokenaddr: props.form.getFieldsValue().tokenaddr,
      createaddr: userAddr,
      tokenamount: Tools.div(props.form.getFieldsValue().endBlock || 0, startBlock || 0),
      startblock: startBlock || 0,
      endblock: props.form.getFieldsValue().endBlock || 0,
      tokenperblock: props.form.getFieldsValue().tokenperblock || blockReward,
      tokenbonusendblock: Tools.plus(startBlock || 0, props.form.getFieldsValue().endBlock || 0),
      tokenbonusmul: props.form.getFieldsValue().tokenbonusmul || 1,
      web: props.form.getFieldsValue().web ? props.form.getFieldsValue().web : '',
      descinfo: props.form.getFieldsValue().descinfo ? props.form.getFieldsValue().descinfo : '',
      lptokensymbol: pair || '',
    };
    console.log(param);

    HttpUtil.ApiAddpool(param)
      .then((res) => {
        console.log(res);
        // setCreatePollId(res.id || '');
        try {
          addPool(
            web3,
            userAddr,
            props.form.getFieldsValue().lptokenaddr || '',
            props.form.getFieldsValue().tokenaddr || '',
            props.form.getFieldsValue().endBlock || 0,
            blockReward,
            totalPools,
            res.id || 0,
            {
              startBlock: latestblack ? 0 : startBlock || 0,
              tokenBonusmul: tokenBonusmul || 1,
              priorEndBlock: priorEndBlock || 0,
              depositAmount: lpTokenAmount || 0,
            }
          );
        } catch (error) {
          console.error('addPool:', error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function approveBalanceFunc() {
    await DefiUtil.approve(web3, props.form.getFieldsValue().tokenaddr, userAddr)
      .on('transactionHash', function (transactionHash) {
        setDping(true);
      })
      .on('receipt', (receipt) => {
        setLines(true);
        setDping(false);
      });
  }

  // 授权
  async function approveFunc() {
    await DefiUtil.approve(web3, GF_ADDRESS, userAddr)
      .on('transactionHash', function (transactionHash) {
        setTenping(true);
      })
      .on('receipt', (receipt) => {
        setTenLines(true);
        setTenping(false);
      });
  }

  const createPollFun = () => {
    if (
      startBlock && props.form.getFieldsValue().endBlock && blockReward && (firstMineReward === 0 ? tokenBonusmul || priorEndBlock : true) && lmMining === 1
        ? lpTokenAmount !== ''
        : true
    ) {
      getTotalPools();
      if (latestblack ? blackHeight : Number(startBlock || 0) > blackHeight) {
        if (Tools.GE(Number(lpstakeNumber), Number(lpTokenAmount)) && Tools.GE(Number(bonusBalance), Number(totalPools))) {
          setCreatePoll(true);
        } else {
          Toast.info(t(['pool.from.novailablebalance']), 1);
        }
      } else {
        setInspection(true);
        Toast.info(t(['pool.from.startingsh']), 1);
      }
    } else {
      setInspection(true);
      Toast.info(t(['message.perfect.information']), 1);
    }
  };

  useEffect(() => {
    async function getUserAddr() {
      if (web3) {
        const accounts = await web3.eth.getAccounts();
        setUserAddr(accounts[0]);
        const lptokenAddrData = await DefiUtil.getBalanceOf(web3, GF_ADDRESS, accounts[0]);
        setlpStakeNumber(Number(await web3.utils.fromWei(lptokenAddrData)));
      }
    }
    getUserAddr();
  });

  useEffect(() => {
    async function getBlackHeight() {
      if (web3) {
        const newBlackHeight = await web3.eth.getBlockNumber();
        setBlackHeight(newBlackHeight);
      }
    }
    getBlackHeight();
    let timer = undefined;
    if (!timer) {
      timer = setInterval(() => {
        getBlackHeight();
      }, averageBlockTime * 10 * 60 - 200);
    }
    return () => {
      clearInterval(timer);
    };
  }, [web3]);

  const { getFieldProps } = props.form;

  return (
    <Fragment>
      {!active ? (
        <Redirect to="/pool/list"></Redirect>
      ) : (
        <div className="poolCreate">
          <div className="black">
            <img className="banner" src="/images/pool/pool_img_dog.png" alt="" />
            <p>{t(['pool.create.fluidpit', ''])}</p>
            <div>
              {t(['pool.current.n.h', ''])} <span>#{blackHeight} </span>
            </div>
          </div>
          <div className="form">
            <div className="title">
              <img className="title-img" src="/images/pool/img_step1.png" alt="" />
              <div className="title-text">{t(['pool.from.liquidityp', ''])}</div>
              <div className="title-desc">{t(['pool.from.addt', ''])}</div>
            </div>
            <div className="list">
              <List className="" renderHeader={() => <div className="form-title">{t(['pool.create.platform', ''])} : </div>}>
                <select className="platform" {...getFieldProps('lptokenfrom', {})}>
                  <option value="Uniswap">Uniswap</option>
                  <option value="Sushiswap">Sushiswap</option>
                </select>
              </List>
              <List
                className=""
                renderHeader={() => (
                  <div className="form-title">
                    {t(['pool.from.lpaddress', ''])}
                    <ExclamationCircleOutlined onClick={() => setTipPair(true)} /> :{' '}
                  </div>
                )}
                renderFooter={() => (
                  <div className="form-foot">
                    Pair: {pair || '--'}
                    <div
                      className="button"
                      onClick={() => {
                        if (props.form.getFieldsValue().lptokenaddr) {
                          getPair();
                        } else {
                          Toast.info(t(['message.perfect.information']), 1);
                        }
                      }}
                    >
                      {t(['pool.to.get', ''])}
                    </div>
                  </div>
                )}
              >
                <InputItem
                  {...getFieldProps('lptokenaddr', {})}
                  className=""
                  type="text"
                  error={inspection ? !props.form.getFieldsValue().lptokenaddr : false}
                  placeholder={t(['pool.from.tokennameenter', ''])}
                  onVirtualKeyboardConfirm={(v) => {
                    if (props.form.getFieldsValue().lptokenaddr) {
                      getPair();
                    }
                  }}
                  onBlur={() => {
                    if (props.form.getFieldsValue().lptokenaddr) {
                      getPair();
                    }
                  }}
                  clear
                ></InputItem>
              </List>
            </div>
            <div className="title">
              <img className="title-img" src="/images/pool/img_step2.png" alt="" />
              <div className="title-text">{t(['pool.from.setparameter', ''])}</div>
              <div className="title-desc">{t(['pool.from.rewardincentive', ''])}</div>
            </div>
            <div className="list">
              <List
                className=""
                renderHeader={() => <div className="form-title">{t(['pool.from.tokenAddr', ''])} : </div>}
                renderFooter={() => (
                  <div className="form-foot">
                    {t(['pool.from.tokenname', ''])} : {tokenAddress || '--'}{' '}
                    <div
                      className="button"
                      onClick={() => {
                        if (props.form.getFieldsValue().tokenaddr) {
                          getTokenAddress();
                        } else {
                          Toast.info(t(['message.perfect.information', '']), 1);
                        }
                      }}
                    >
                      {t(['pool.to.get', ''])}
                    </div>
                  </div>
                )}
              >
                <InputItem
                  {...getFieldProps('tokenaddr', {})}
                  className=""
                  type="text"
                  error={inspection && !props.form.getFieldsValue().tokenaddr}
                  placeholder={t(['pool.from.tokennameenter', ''])}
                  onVirtualKeyboardConfirm={(v) => {
                    if (props.form.getFieldsValue().tokenaddr) {
                      getTokenAddress();
                    } else {
                      Toast.info(t(['message.perfect.information', '']), 1);
                    }
                  }}
                  onBlur={() => {
                    if (props.form.getFieldsValue().tokenaddr) {
                      getTokenAddress();
                    }
                  }}
                  clear
                ></InputItem>
              </List>
              <List className="" renderHeader={() => <div className="form-title">{t(['pool.from.startingh', ''])} : </div>}>
                <InputItem
                  className=""
                  type="text"
                  error={latestblack ? false : (!startBlock && inspection) || (inspection && Number(startBlock || 0) < blackHeight)}
                  placeholder={latestblack ? blackHeight : t('pool.from.startingbh', { p: blackHeight || '' })}
                  disabled={latestblack}
                  value={startBlock}
                  onChange={(val) => setStartBlock(val)}
                  onBlur={() => {
                    if (startBlock && props.form.getFieldsValue().endBlock) {
                      getEndBlackHeight();
                    } else if ((startBlock && Number(startBlock || 0)) > blackHeight) {
                      Toast.info(t(['pool.from.startingsh']), 1);
                    }
                  }}
                  clear
                ></InputItem>
              </List>
              <div className="form-foot">
                <AgreeItem
                  data-seed="logId"
                  onChange={(e) => {
                    e.preventDefault();
                    setLatestBlack(e.target.checked);
                    if (e.target.checked) {
                      setStartBlock(blackHeight);
                    } else {
                      setStartBlock('');
                    }
                    if (startBlock && props.form.getFieldsValue().endBlock) {
                      getEndBlackHeight();
                    }
                  }}
                >
                  {t(['pool.immediately', ''])}
                </AgreeItem>
              </div>
              <List
                className=""
                renderHeader={() => <div className="form-title">{t(['pool.block.amount', ''])} : </div>}
                renderFooter={() => (
                  <div className="form-foot">
                    {t(['pool.from.closingh', ''])}: {calculateEndheight || '--'}{' '}
                    <div className="button" onClick={() => getEndBlackHeight()}>
                      {t(['pool.to.get', ''])}
                    </div>
                  </div>
                )}
              >
                <InputItem
                  {...getFieldProps('endBlock', {})}
                  className=""
                  type="number"
                  error={!props.form.getFieldsValue().endBlock && inspection}
                  placeholder={t(['pool.from.eminingenter', ''])}
                  onVirtualKeyboardConfirm={(v) => getPair()}
                  onBlur={() => {
                    if (startBlock && props.form.getFieldsValue().endBlock) {
                      getEndBlackHeight();
                    }
                  }}
                  clear
                ></InputItem>
              </List>
              <List
                className=""
                renderHeader={() => <div className="form-title">{t(['pool.expected.closing', ''])} : </div>}
                renderFooter={() => (
                  <div className="form-foot">
                    {startClosTime || '--'}{' '}
                    <div className="button" onClick={() => getStartClosTime()}>
                      {t(['pool.to.get', ''])}
                    </div>
                  </div>
                )}
              >
                {''}
              </List>
              <List className="" renderHeader={() => <div className="form-title">{t(['pool.from.miningper', ''])} : </div>}>
                <InputItem
                  // {...getFieldProps('tokenperblock', {})}
                  className=""
                  type="money"
                  moneyKeyboardAlign="left"
                  error={!blockReward && inspection}
                  placeholder={t(['pool.each.block.reward', ''])}
                  // onVirtualKeyboardConfirm={(v) => getPair()}
                  onChange={(val) => {
                    console.log(val);
                    setBlockReward(val);
                    if (tokenBonusmul && val) {
                      setMultiple(Tools.mul(tokenBonusmul, val));
                    } else {
                      setMultiple('');
                    }
                  }}
                  value={blockReward}
                  onBlur={() => {
                    if (firstMineReward === 1 && props.form.getFieldsValue().endBlock && blockReward && priorEndBlock && tokenBonusmul) {
                      getTotalPools();
                    }
                  }}
                  clear
                ></InputItem>
              </List>
              <div className="radio">
                <p>{t(['pool.initial.reward', ''])}:</p>
                <div>
                  <input name="firstMineReward" type="radio" value="0" checked={firstMineReward === 0} onChange={(val) => setFirstMineReward(0)} />
                  <span>{t(['but.start.but', ''])}</span>
                  <input name="firstMineReward" type="radio" value="1" checked={firstMineReward === 1} onChange={(val) => setFirstMineReward(1)} />
                  <span> {t(['but.close', ''])}</span>
                </div>
              </div>
              {firstMineReward === 0 ? (
                <>
                  <List className="" renderHeader={() => <div className="form-title">{t(['pool.from.bonusmultiple', ''])} : </div>}>
                    <InputItem
                      // {...getFieldProps('tokenbonusmul', {})}
                      className=""
                      type="number"
                      error={!tokenBonusmul && inspection}
                      moneyKeyboardAlign="left"
                      value={tokenBonusmul}
                      onChange={(val) => {
                        setTokenbonusmul(val);
                        if (val && blockReward) {
                          setMultiple(Tools.mul(val, blockReward));
                        } else {
                          setMultiple(0);
                        }
                      }}
                      placeholder={t(['pool.from.pleaseeninteger', ''])}
                      // onVirtualKeyboardConfirm={(v) => getPair()}
                      clear
                    ></InputItem>
                  </List>
                  <List className="" renderHeader={() => <div className="form-title">{t(['pool.from.InitialIncentivest', ''])} : </div>}>
                    <InputItem
                      // {...getFieldProps('tokenbonusendblock', {})}
                      className=""
                      type="number"
                      error={!priorEndBlock && inspection}
                      placeholder={t(['pool.from.enincentiveco', ''])}
                      // onVirtualKeyboardConfirm={(v) => getPair()}
                      value={priorEndBlock}
                      onChange={(val) => setPriorEndBlock(val)}
                      onBlur={() => {
                        if (firstMineReward === 0 && props.form.getFieldsValue().endBlock && blockReward && priorEndBlock && tokenBonusmul) {
                          getTotalPools();
                          getHeadtime();
                        }
                      }}
                      clear
                    ></InputItem>
                  </List>
                  <List
                    className=""
                    renderFooter={() => (
                      <div className="form-foot">
                        {t(['pool.from.estimatedendtime', ''])} : {bonuseEndtime || '--'}{' '}
                        <div className="button" onClick={() => getHeadtime()}>
                          {t(['pool.to.get', ''])}
                        </div>
                      </div>
                    )}
                  ></List>
                  <div className="mineReward">
                    <div className="progress">
                      <div></div>
                    </div>
                    <div className="progress-title">
                      <p>{t(['pool.from.startsmiun', ''])}</p>
                      <p>{t(['pool.from.InitialIncentivest', ''])}</p>
                      <p>{t(['pool.from.stopmin', ''])}</p>
                    </div>
                    <div className="progress-date">
                      <div style={{ width: '44%' }}>
                        <img src="/images/pool/img_arrow_left.png" alt="" />
                        <p>
                          {t(['pool.initial.reward', 'Mining reward'])}:{multiple || '--'}
                        </p>
                        <img src="/images/pool/img_arrow_right.png" alt="" />
                      </div>
                      <div style={{ width: '56%' }}>
                        <img src="/images/pool/img_arrow_left.png" alt="" />
                        <p>
                          {t(['pool.from.miningrewardt', 'Mining reward'])}:{blockReward || '--'}
                        </p>
                        <img src="/images/pool/img_arrow_right.png" alt="" />
                      </div>
                    </div>
                  </div>
                  <List
                    className=""
                    renderFooter={() => (
                      <div className="form-foot">
                        {t(['pool.pools', ''])} : {totalPools || '--'}{' '}
                        <div className="button" onClick={() => getTotalPools()}>
                          {t(['pool.to.get', ''])}
                        </div>
                      </div>
                    )}
                  ></List>
                </>
              ) : (
                ''
              )}
              <List
                className=""
                renderFooter={() => (
                  <div className="form-foot">
                    {t(['pool.from.vailablebalance', ''])} : {bonusBalance || 0}
                  </div>
                )}
              ></List>
            </div>
            <div className="title">
              <img className="title-img" src="/images/pool/img_step3.png" alt="" />
              <div className="title-text">{t(['pool.from.addtento', ''])}</div>
              <div className="title-desc">{t(['pool.from.liquiditytenmrew', ''])}</div>
            </div>
            <div className="list">
              <div className="radio">
                <p>{t(['pool.lm.mining', ''])}:</p>
                <div>
                  <input
                    name="Mining"
                    type="radio"
                    value={t(['but.start.but', ''])}
                    checked={lmMining === 1}
                    onClick={() => {
                      console.log('1');
                      setLpMining(1);
                    }}
                  />
                  <span>{t(['but.start.but', ''])}</span>
                  <input
                    name="Mining"
                    type="radio"
                    value={t(['but.close', ''])}
                    checked={lmMining === 2}
                    onClick={() => {
                      // setLpMining(2);
                      setRewardSwitch(true);
                    }}
                  />
                  <span> {t(['but.close', ''])}</span>
                </div>
              </div>
              {lmMining === 1 ? (
                <List
                  renderHeader={() => <div className="form-title">{t(['pool.from.addedlnumt', ''])} : </div>}
                  renderFooter={() => (
                    <div className="form-foot">
                      {t(['details.available', ''])} : {lpstakeNumber || 0}
                    </div>
                  )}
                >
                  <InputItem
                    // {...getFieldProps('lpTokenAmount', {})}
                    className=""
                    type="money"
                    moneyKeyboardAlign="left"
                    extra={<div className="max-but">{t(['but.max', 'Max'])}</div>}
                    placeholder={t(['details.stake.number', ''])}
                    // onVirtualKeyboardConfirm={(v) => getTokenAddress()}
                    value={lpTokenAmount}
                    onChange={(val) => setLpTokenAmount(val)}
                    onExtraClick={() => {
                      // console.log('onExtraClick');
                      // console.log(props.form);
                      // setFieldsValuefun();
                      setLpTokenAmount(lpstakeNumber);
                      // setStakeNumber（）;
                    }}
                    error={lpTokenAmount > lpstakeNumber}
                    // onBlur={() => getTokenAddress()}
                    clear
                  ></InputItem>
                </List>
              ) : (
                ''
              )}
              <div className="tent-lptoken">
                <a href={ETH_TEN_UNIV2_LPTOKEN} target="_blank" rel="noopener noreferrer">
                  <span>{t(['pool.from.gaintoken', ''])} </span>
                  <ArrowRightOutlined />
                </a>
              </div>
            </div>
            <div className="title">
              <img className="title-img" src="/images/pool/img_finally.png" alt="" />
              <div className="title-text">
                ({t(['pool.from.projectin', ''])}){t(['pool.from.optionale', ''])}
              </div>
              {/* <div className="title-desc">{t(['pool.from.addt', ''])}</div> */}
            </div>
            <div className="list">
              <List renderHeader={() => <div className="form-title">{t(['details.website', ''])} : </div>}>
                <InputItem
                  {...getFieldProps('web', {})}
                  className=""
                  type="text"
                  placeholder={t(['pool.website.address', ''])}
                  // onVirtualKeyboardConfirm={(v) => getPair()}
                  clear
                ></InputItem>
              </List>
              <List className="textareaItem" renderHeader={() => <div className="form-title">{t(['pool.project.Introduction', ''])} : </div>}>
                <TextareaItem
                  rows="3"
                  {...getFieldProps('descinfo', {})}
                  className=""
                  type="text"
                  placeholder={t(['pool.please.enter', ''])}
                  clear
                ></TextareaItem>
              </List>
            </div>
          </div>
          <div className="create-but">
            <div className="button" onClick={() => createPollFun()}>
              {t(['pool.but.create', ''])}
            </div>
          </div>
          {/* 地址 */}
          <Modal visible={tipPair} className="pool-create-modal" transparent>
            <div className="title">{t(['pool.how.address', ''])}</div>
            <div className="content">
              <img className="banner" src="/images/pool/img_pairaddress.png" alt="" />
              <p>{t(['pool.go.pool.page', ''])}</p>
              <p>{t(['pool.click.copy', ''])}</p>
              <div className="btn-box">
                <button
                  className="btn-theme"
                  onClick={() => {
                    setTipPair(false);
                  }}
                >
                  {t(['but.I.got.it', ''])}
                </button>
              </div>
            </div>
          </Modal>
          {/* 质押 */}
          <Modal visible={rewardswitch} className="pool-create-modal" transparent>
            <div className="title">{t(['pool.confirm.shutdown', ''])}</div>
            <div className="content">
              <div className="modalInfo-content-body">
                <p>{t(['pool.liquidity.pool', ''])}</p>
                <p>{t(['pool.choosestakelp ', ''])}</p>
              </div>
              <div className="btn-box">
                <button
                  className="btn-theme"
                  onClick={() => {
                    setLpMining(1);
                    setRewardSwitch(false);
                  }}
                >
                  {t('but.cancel')}
                </button>
                <button
                  className="btn-theme"
                  onClick={() => {
                    setLpMining(2);
                    setRewardSwitch(false);
                  }}
                >
                  {t('but.confirm')}
                </button>
              </div>
            </div>
          </Modal>
          {/* 创建 */}
          <Modal visible={createPoll} className="pool-create-modal" transparent>
            <div className="title">{t(['pool.but.create', ''])}</div>
            <div className="content">
              <div className="close-box" onClick={() => setCreatePoll(false)}>
                <CloseOutlined />
              </div>
              <div className="content-body">
                <p>{t(['pool.predeposit.token', ''])}</p>
                <div className="content">
                  <p>
                    {tokenAddress || '--'}:<span>{totalPools || 0}</span>
                  </p>
                  {lmMining === 1 ? (
                    <p>
                      TEN-ETH LP Tokens：<span>{props.form.getFieldsValue().lpTokenAmount || 0}</span>
                    </p>
                  ) : (
                    ''
                  )}
                </div>
              </div>
              <div className="create-box">
                {lmMining === 1 ? (
                  <Fragment>
                    {lines && tening ? (
                      <div className={lines ? 'btn-box-click anim-fade-out' : 'btn-box-click'}>
                        {dping ? (
                          <Button className="but-cancel click-but-waitingt">
                            <p> {t('details.authorize')}...</p>
                            <p>{tokenAddress || '--'}</p>
                          </Button>
                        ) : (
                          <Button
                            className={lines ? 'but-cancel click-but-active' : 'but-cancel click-but'}
                            onClick={() => {
                              approveBalanceFunc();
                            }}
                            disabled={lines}
                          >
                            <p>
                              {lines ? <CheckCircleOutlined /> : ''} {lines ? t('pool.authorized') : t('details.authorize')}
                            </p>
                            <p>{tokenAddress || '--'}</p>
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
                          createPool();
                        }}
                        disabled={!tenLines || !lines}
                      >
                        {t(['pool.but.create', ''])}
                      </Button>
                    )}
                  </Fragment>
                ) : (
                  <Fragment>
                    <div className={lines ? 'btn-box-click anim-fade-out' : 'btn-box-click'}>
                      {dping ? (
                        <Button className="but-cancel click-but-waitingt">
                          <p> {t('pool.authorized')}...</p>
                          <p>{tokenAddress || '--'}</p>
                        </Button>
                      ) : (
                        <Button
                          className={lines ? 'but-cancel click-but-active' : 'but-cancel click-but'}
                          onClick={() => {
                            approveBalanceFunc();
                          }}
                          disabled={lines}
                        >
                          <p>
                            {lines ? <CheckCircleOutlined /> : ''}
                            {lines ? t('pool.authorized') : t('details.authorize')}
                          </p>
                          <p>{tokenAddress || '--'}</p>
                        </Button>
                      )}
                      {!lines ? (
                        <Fragment>
                          {createing ? (
                            <Button className="click-but-waiting but-confirm click-but">
                              <p>{t(['pool.but.create', ''])}</p> ...
                            </Button>
                          ) : (
                            <Button
                              className={!lines ? 'click-but but-confirm click-but-disabled' : 'but-confirm click-but'}
                              onClick={() => createPool()}
                              disabled={!lines}
                            >
                              <p>{t(['pool.but.create', ''])}</p>
                            </Button>
                          )}
                        </Fragment>
                      ) : (
                        ''
                      )}
                    </div>
                    {lines ? (
                      <Fragment>
                        {createing ? (
                          <Button className="click-but-know click-but-waiting">
                            <p>{t(['pool.but.create', ''])}</p> ...
                          </Button>
                        ) : (
                          <Button
                            className={lines ? 'click-but-know' : 'click-but-know click-but-disabled'}
                            onClick={() => {
                              createPool();
                            }}
                            disabled={!lines}
                          >
                            {t(['pool.but.create', ''])}
                          </Button>
                        )}
                      </Fragment>
                    ) : (
                      ''
                    )}
                  </Fragment>
                )}
              </div>
            </div>
          </Modal>
          {/* 提交成功 */}
          <Modal visible={tipTrading} className="pool-create-modal" transparent>
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
                      <a href={`${TX_ETHERSCAN_URL}${hash}`} target="_blank" rel="noopener noreferrer">
                        <div className="eth-hash">{hash || '--'}</div>
                      </a>

                      <CopyToClipboard text={hash || ''} onCopy={() => Toast.info(t('copy'))}>
                        <span>
                          <CopyOutlined />
                        </span>
                      </CopyToClipboard>
                      {/* </Paragraph> */}
                    </div>
                  </li>
                  {/* <li> */}
                  {/* <span>{t(['pool.from.pendingtransaction', ''])}</span> */}
                  {/* </li> */}
                </ul>
              </div>
              <div className="btn-box">
                <button
                  className="btn-theme"
                  onClick={() => {
                    history.push(`/pool/list`);
                  }}
                >
                  {t(['but.I.got.it', ''])}
                </button>
              </div>
            </div>
          </Modal>
        </div>
      )}
    </Fragment>
  );
};

export default createForm()(PoolCreate);
