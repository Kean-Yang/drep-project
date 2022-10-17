import * as HttpUtil from '../utils/HttpUtil';

/**
 * 公告列表
 * @param {*} params
 */
export const ApiNoticeList = () => {
  return HttpUtil.URLENCODED_GET('/api/tenet/querynotice.do', {});
};
