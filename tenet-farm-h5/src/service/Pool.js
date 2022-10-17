import * as HttpUtil from '../utils/HttpUtil';

/**
 * 首页池子列表查询
 * @param {*} page
 * @param {*} count
 * @param {*} sort
 * @param {*} sortdir
 * @param {*} search
 * @param {*} status
 */
export const ApiPoolList = (params) => {
  return HttpUtil.URLENCODED_GET('/api/tenet/querypools.do', params);
};

/**
 * 创建流动池
 * @param {*} params
 */
export const ApiAddpool = (params) => {
  return HttpUtil.URLENCODED_GET('/api/tenet/addpool.do', params);
};

/**
 * 流动池详情
 * @param {*} params
 */
export const ApiPoolDetail = (params) => {
  return HttpUtil.URLENCODED_GET('/api/tenet/querypooldetail.do', params);
};

/**
 * 交易记录
 * @param {*} userAddr\pid
 */
export const ApiPoolTraRecord = (params) => {
  return HttpUtil.URLENCODED_GET('/api/tenet/queryusertrade.do', params);
};

/**
 * 交易记录
 * @param {*} pid
 */
export const ApiPoolProjectTraRecord = (params) => {
  return HttpUtil.URLENCODED_GET('/api/tenet/querypooltrade.do', params);
};

/**
 * 最新一笔交易记录
 * @param {*} userAddr
 */
export const ApiPoolLastOneRecord = (params) => {
  return HttpUtil.URLENCODED_GET('/api/tenet/querypooltrade.do', params);
};

/**
 * 添加流动池hash信息
 * @param {*}
 */
export const ApiAddpoolPending = (params) => {
  return HttpUtil.URLENCODED_GET('/api/tenet/setpoolhash.do', params);
};

/**
 * 流动池变动信息
 * @param {*} addr
 */
export const ApiPoolInfo = (params) => {
  return HttpUtil.URLENCODED_GET('/api/tenet/querypoolcreate.do', params);
};
