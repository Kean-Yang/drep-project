/*
 * @Description: 钱包后台管理系统
 * @Author: yangdong dongyang@drep.org
 * @Date: 
 * @LastEditTime: 
 * @LastEditors:
 */

'use strict';

import axios from 'axios';
import { message } from 'antd';

// http://localhost:5000
// 环境变量的切换
let baseURL = "";
// 本地环境
if (process.env.NODE_ENV === 'development') {
    baseURL = 'http://192.168.31.24:1213/drep';
    // debug环境    
} else if (process.env.NODE_ENV === 'test') {
    baseURL = 'http://192.168.31.24:1213/drep';
    // 线上服务环境    
} else if (process.env.NODE_ENV === 'production') {
    // 线上测试环境
    if (typeof window !== 'undefined' && window.location.hostname.includes('leoplus.staging.manage.newtank.cn')) {
        baseURL = 'http://47.88.230.122:12135/drep';
        // 线上uat环境    
    } else if (typeof window !== 'undefined' && window.location.hostname.includes('leoplus.uat.manage.newtank.cn')) {
        baseURL = 'http://47.88.230.122:12135/drep';
        // 正式生产环境  
    } else if (typeof window !== 'undefined' && window.location.hostname.includes('leoplus.manage.newtank.cn')) {
        baseURL = 'http://47.88.230.122:12135/drep';
    }
}
axios.defaults.headers.post['Content-Type'] = 'application/json'

export const AxiosReq = axios.create(
    {
        baseURL: baseURL,
        timeout: 10000,
    }
);



// response 请求拦截器
AxiosReq.interceptors.request.use(
    config => {
        // if (localStorage.getItem('auth') && localStorage.getItem('nickName')) { // 判断是否存在accessToken，如果存在的话，则每个http header都加上token
        //     let base64Token = 'Basic ' + localStorage.getItem('auth');
        //     config.headers.authorization = base64Token;  //请求头加上accessToken
        // }
        return config
    },
    err => {
        return Promise.reject(err)
    }
)

// response 响应拦截器
AxiosReq.interceptors.response.use(
    response => {
        // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
        // 否则的话抛出错误
        if (response.status === 200) {
            return response.data;
        } else {
            message.error(response.data.message)
        }
    },
    error => {
        // console.log(error.response)
        if (error.response) {
            switch (error.response.status) {
                case 400:
                    console.log(error.response.data.message)
                    message.warning(error.response.data.message);
                    break;
                // 401: 未登录
                // 未登录则跳转登录页面，并携带当前页面的路径
                // 在登录成功后返回当前页面，这一步需要在登录页操作。
                case 401:
                    message.warning('未登录');
                    break;
                // 403 token过期
                // 登录过期对用户进行提示
                // 跳转登录页面
                case 403:
                    // 清除token
                    // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
                    message.warning('重新登陆');
                    break;
                // 404请求不存在
                case 404:
                    message.warning('网络请求不存在');
                    break;
                // 服务错误    
                case 502:
                    alert("服务错误")
                    break;
                // 其他错误，直接抛出错误提示
                default:
                    message.warning(error.response.data.message);
            }
            return Promise.reject(error.response);
        }
    }
);

