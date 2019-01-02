/**
 * 工具类
 */
import  { menu }  from '../../config/game';
const Util =
{
    setStorage(data){
        for(let item in data){
        localStorage[item] = data[item];
      }
    },
    
    checkLogin(){
        return localStorage.hasOwnProperty('token');
    },
    getStorage(key){
        return localStorage.getItem(key) ? localStorage[key] : "";
    },
    
    checkHttp(url){
        return  url.indexOf('http') === 0 ;
    },
    
    loadComponents(path){
        return () => import('@/components' + path);
    },
    
    generateRouteComponents(){
        let addrs = [] ;
        for (let item of menu){
            for (let subAddr  of item.subMeun ){
                addrs.push(subAddr.addr);
            }
        }
        let result = [];
        for(let addr of addrs){
            result.push({path:addr,component:this.loadComponents('/route'+addr)})
          }
        return result;
    }
};

export default Util;
