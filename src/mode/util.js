/**
 * 工具类
 */

import store from '../store';
import request from './request'
const Util =
{
    temp:[],
    // TODO 设置local的的时候依据用户名分类
    setStorage(data){
        for(let item in data){
            localStorage.setItem(item,data[item]);
      }
    },
    
    checkLogin(){
        return localStorage.hasOwnProperty('token');
    },
    getStorage(key){
        return localStorage.getItem(key) ? localStorage.getItem(key) : "";
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
    
    chenkVuexMenu(){
       return store.state.menu.length !== 0
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
    
    /**
     * @returns {Array}
     */
    generateRouteComponents(){
        let addrs = [] ;
        let menu = store.state.menu ;
        if( 0 === menu.length){
            return [] ;
        }
        for (let item of menu){
            for (let subAddr  of item.subMeun){
                addrs.push(subAddr.addr);
            }
        }
        let result = [];
        for(let addr of addrs){
            result.push({path:addr,
                components:{
                    main:this.loadComponents('/base/menu'),
                    default:this.loadComponents('/route'+addr)
                }
            })
          }
        return result;
    },
    
    getMeun(){}
    
};

export default Util;
