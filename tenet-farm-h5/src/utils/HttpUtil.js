import axios from 'axios';
import qs from 'qs';
import { Toast } from 'antd-mobile';
import i18next from 'i18next';
import { getBackLang } from '../i18n/LangUtil';

const interceptors = (instance) => {
  // request 拦截器
  instance.interceptors.request.use(
    (config) => config,
    (error) => Promise.reject(error)
  );
  // response 拦截器
  instance.interceptors.response.use(
    (response) => {
      if (process.env.NODE_ENV === 'development') console.info(`接口${response.config.url}响应信息:`, response);
      const { code, msg } = response.data;
      if (code === '0') {
        return Promise.resolve(response.data.info || '');
      } else if (code === '106') {
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('nickname');
        Toast.fail(i18next.t(code) || msg);
        const url = encodeURIComponent(`${window.location.pathname}${window.location.search}`);
        window.location = `/user/login?redirect=${url}`;
        return Promise.reject(Object.assign({}, { msg: i18next.t(code) || msg, code }));
      } else if (code === 200) {
        return Promise.resolve(response.data.data || '');
      } else {
        return Promise.reject(Object.assign({}, { msg: i18next.t(code) || msg, code }));
      }
    },
    (error) => {
      try {
        if (process.env.NODE_ENV === 'development') console.error(`接口${error.response.config.url}响应错误信息:`, error.response);
        const code = error.response.status || '';
        const msg = error.response.data.msg;
        return Promise.reject(Object.assign({}, { code, msg: i18next.t(code) || msg || '系统有点累，请稍后再试。' }));
      } catch (e) {
        return Promise.reject(Object.assign({}, { msg: i18next.t('-1'), code: -1 }));
      }
    }
  );
};

/**
 * 奇葩的调用方式
 * @param {*} url
 * @param {*} params
 */
export function URLENCODED_POST(url, params) {
  const instance = axios.create({ timeout: 10000, headers: { 'Content-Type': 'application/x-www-form-urlencoded', Accept: 'application/json' } });
  interceptors(instance);
  let token = window.localStorage.getItem('token') || '';
  if (token) params['token'] = token; // 获取
  params['language'] = getBackLang();
  let paramsTemp = {};
  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      const element = params[key];
      paramsTemp[key] = element.toString();
    }
  }
  paramsTemp = { p: window.JSON.stringify(paramsTemp) };
  return instance.post(url, qs.stringify(paramsTemp));
}

/**
 * 奇葩的调用方式
 * @param {*} url
 * @param {*} params
 */
export function URLENCODED_GET(url, params) {
  const instance = axios.create({ timeout: 10000, headers: { 'Content-Type': 'application/x-www-form-urlencoded', Accept: 'application/json' } });
  interceptors(instance);
  if (!params || Object.keys(params) === 0) params = {};
  let token = window.localStorage.getItem('token') || '';
  if (token) params['token'] = token; // 获取
  params['language'] = getBackLang();
  let paramsTemp = {};
  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      const element = params[key];
      paramsTemp[key] = element.toString();
    }
  }
  paramsTemp = { p: window.JSON.stringify(params) };
  return instance.get(`${url}?${qs.stringify(paramsTemp)}`);
}

/**
 * 多个请求合并
 * @param {*} reqs
 */
export function ALL(reqs = []) {
  return Promise.all(reqs);
}
