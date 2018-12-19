import axios from 'axios';
import util from './util';

/**
 * 发起网络请求
 */
class request
{
  constructor(){
    
    // 需要配置好跨域 请求字段为允许通过的字段
    this.url = "http://192.168.0.252:8001/";
    this.config = {
      headers:{
        'X-FengBao-Token':util.getStorage('token'),
      },
    }
  }
  
  /**
   * 同步post请求
   * @param url 域名，如果没有http开头，则使用配置中的地址拼接
   * @param data
   * @returns {Promise<AxiosResponse<any>>}
   */
  syncPost(url,data) {
    
    let finalUrl = util.checkHttp(url) ? url : this.url+url;
    // axios.post(finalUrl,data,this.config).then((response) => {
    //   if(response.status === 200 ){
    //     this.data = response.data;
    //   }else {
    //     this.data = '';
    //   }
    //   });
    // return this.data ;
    return axios.post(finalUrl,data,this.config);
  }
  
  /**
   * 同步get请求
   * @param url 域名，如果没有http开头，则使用配置中的地址拼接
   * @returns {Promise<AxiosResponse<any>>}
   */
  syncGet(url) {
  
    let finalUrl = util.checkHttp(url) ? url : this.url+url;
    return axios.get(finalUrl,this.config).then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error;
    })
  }
  
  /**
   * @param url 域名，如果没有http开头，则使用配置中的地址拼接
   * @param data 请求体中传递的数据
   * @param method 方法，默认为post
   * @returns {Promise<*>}
   */
  async asyncRequest(url,data,method='post'){
  
    let finalUrl = util.checkHttp(url) ? url : this.url+url;
      try{
        if(method === 'get'){
          return await axios.get(finalUrl,this.config);
        }else {
          return await axios.post(finalUrl, data, this.config);
        }
      }catch (e) {
        return e;
      }
  
  }
}

export default new request();
