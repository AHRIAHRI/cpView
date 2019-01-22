import axios from 'axios';
import Vue from 'vue';
import router from '../router';
import { main } from 'Config/game' ;
/**
 * 全局axios , 携带 token 进行请求
 */
if( process.env.NODE_ENV === 'production') {
    axios.defaults.baseURL = 'http://data.apidev.fengbaogame.cn/api/v1/';
}
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
    if(response.data === 'permissionIsNotDefined'){
        // this.$Modal.error({
        Vue.prototype.$Modal.error({
            title: '抱歉! 权限不足',
            content: '请联系管理员',
        });
    }else{
        return response;
    }
}, function (error) {
    try {
        Vue.prototype.$Notice.error({
            title: '无法预知的错误',
            desc: '抱歉！出现系统异常的访问, 请联系管理员',
            duration: 8,
        });
        router.push('/login');
        console.log('login');
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
