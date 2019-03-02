import axios from 'axios';
import Vue from 'vue';
import router from '../router';
import { main } from 'Config/game' ;
import iView from 'iview';
Vue.use(iView);

import Util from './util';

iView.LoadingBar.config({
    color: '#19be6b',
    failedColor: '#ed4014',
    height: 2
});


/**
 * 全局axios , 携带 token 进行请求
 */
if( process.env.NODE_ENV === 'production') {
    axios.defaults.baseURL = 'https://api.data.fengbaogame.cn/api/v1/';
}
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

/**
 * 添加一个请求拦截
 */
axios.interceptors.request.use(
    function (config) {
        config.headers.Authorization = 'bearer '+ localStorage.getItem("token");
        iView.LoadingBar.start();
        return config;
    },function(error){
        return Promise.reject(error);
});

/**
 * 添加一个响应拦截器
 */
axios.interceptors.response.use(function (response) {
    iView.LoadingBar.finish();
    return response;
}, function (error) {
    iView.LoadingBar.error();
    try {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if(401 === error.response.status) {
                Vue.prototype.$Notice.error({
                    title: '授权失败',
                    desc: '您没有权限继续访问！',
                    duration: 8,
                });
                // router.push('/login');
            }else {
                Vue.prototype.$Notice.error({
                    title: '服务器状态码:' + error.response.status,
                    desc: '服务器返回了一个错误:' + error.response.data,
                    duration: 0,
                })
            }
            // console.log('error.response.data :' + error.response.data);
            // console.log('error.response.status :' + error.response.status);
            // console.log('error.response.headers :' , error.response.headers);
        // } else if (error.request) {
        //     // The request was made but no response was received
        //     // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        //     // http.ClientRequest in node.js
        //     console.log('error.request :' + error.request);
        } else {
            Vue.prototype.$Notice.error({
                title: '无法预料的错误',
                desc: '抱歉！这是一个无法预知的错误',
                duration: 0,
            });
            
            // Something happened in setting up the request that triggered an Error
            console.log('error.message :', error.message);
        }
        console.log('error.config :',error.config);
    }catch (error) {
        console.log(error)
    }finally{
        return Promise.reject(error);
    }
}) ;

const API = {
    POST(url,data={},config={}) {
        return axios.post(url,data,config);
    },
    GET(url,config={}) {
        return axios.get(url,config) ;
    },

} ;

export default API;
