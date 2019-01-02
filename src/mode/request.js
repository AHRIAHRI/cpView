import axios from 'axios';
import util from './util';
import Vue from 'vue';
import router from '../router';
import {main} from '../../config/game' ;

/**
 * 全局axios , 携带 token 进行请求
 */
axios.defaults.baseURL = main.url;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

/**
 * 添加一个请求拦截
 */
axios.interceptors.request.use(
    function (config) {
        config.headers.Authorization = 'bearer '+ localStorage.getItem("token");
        return config;
    },function(error){
        return Promise.reject(error);
});

/**
 * 添加一个响应拦截器
 */
axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    // conslole.log(error.response);
    Vue.prototype.$Notice.error({
        title:'无法预料的响应',
        desc:'抱歉！无法继续数据访问，这是系统异常的访问, 请联系管理员',
        duration:8,
    });
    // console.log('身份验证失败');
    router.push('/login');
    return Promise.reject(error);
}) ;

const API = {
    POST(url,data,config={}) {
        return axios.post(url,data,config);
    },
    GET(url,config={}) {
        return axios.get(url,config) ;
    },
} ;

export default API;
