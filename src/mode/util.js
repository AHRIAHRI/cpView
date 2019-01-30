/**
 * 工具类
 */

import store from '../store';
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
    
    getVuexItem(item){
        return store.state[item] ? store.state[item] : false;
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
     * 有几个地方会进行重载
     * 登录的时候 ，菜单栏加载的时候，修改选着的项目的时候，登录之后由于某种原因没加载到的时
     */
    reloadUserInfo(){
        store.commit({
            type:'sotreUserInfo',
            selectProject:this.getStorage('selectProject'),
            selectProjectName:this.getStorage('selectProjectName'),
            userName:this.getStorage('userName'),
        });
    },
    /**
     * Force page refresh
     */
    windowsReload(){
        window.location.reload() ;
    },
    
    /**
     * @returns {Array}
     * 菜单栏加载之后，生成组件路由
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
                    main:this.loadComponents('/system/Menu'),
                    default:this.loadComponents('/route'+addr),
                },
                // beforeEnter: (to, from, next)=>{
                //     // 检查vuex否有基础的信息 选择的项目 等
                //     // 如果没有,判断localStorage中有没有，如果依然没有，则跳转到noselect 页面
                //     // TODO 还没有测试
                //     if(to.path === '/sys/useSet') {
                //         next();
                //     }else {
                //         if(!store.state.selectProject){
                //             if(!this.getStorage('selectProject')){
                //                 this.$router.push('/sys/useSet')
                //             }else{
                //                 this.reloadUserInfo();
                //                 next()
                //             }
                //         }else {
                //             next()
                //         }
                //     }
                // }
            })
          }
        return result;
    },
    
    getMeun(){}
    
};
export default Util;
