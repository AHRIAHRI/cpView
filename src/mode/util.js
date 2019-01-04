/**
 * 工具类
 */

import  { menu }  from 'Config/game';
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
    
    /**
     * Rsync Load Components
     * @param path
     * @returns {function(): (Promise<*>|*)}
     */
    loadComponents(path){
        return () => import('@/components' + path);
    },
    
    /**
     *  Async Load Components
     * @param path
     * @returns {function(): {component: (Promise<*>|*), loading: *, error: *, delay: number, timeout: number}}
     * @constructor
     */
    AsyncComponent(path){
        return () => ({
            component: import('@/components' + path),
            loading: LoadingComponent,
            error: ErrorComponent,
            delay: 1000,
            timeout: 3000
        }) ;
    },
    /**
     * Force page refresh
     */
    windowsReload(){
        window.location.reload() ;
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
