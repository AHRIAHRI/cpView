import Vue from 'vue';
import Router from 'vue-router';
import Util from '../mode/util';
import Request from '../mode/request';
import Store from '../store';


Vue.use(Router);
const router = new Router({
    // mode:'history',
    routes: [
        {path: '/login', name: 'login', component: Util.loadComponents('/login'),},
        
        {path: '/userSet',name: 'userSet', components:{
                main:Util.loadComponents('/system/Menu'),
                default:Util.loadComponents('/system/userSet'),
            }
            
            },
        {path: '/notPermission',name:'notPermission',component:Util.loadComponents('/notPermission')},
        {path: '/', name: 'home',component: Util.loadComponents('/system/Menu'),},
        
        // 对于不存在的请求,跳转到主页,并且重新加载组件路由。
        {path: '*', redirect: '/' ,},
    ]
}) ;

// 对所有的路由进行检查和统一分配 , 如果验证没通过则返回登录界面
router.beforeResolve((to,from,next)=>{
    
    // 每次切换重新加载进度条
    Store.commit({
        type:'startLoadstatus',
        start:false,
        status:false,
    });
    
    if(to.name !== 'login' && ! Util.checkLogin()) {
        if(to.name !== 'home') {
            Vue.prototype.$Notice.error({
                title: '请先登录',
                desc: '抱歉！您尚未取得凭证,无法继续数据访问.',
                duration: 8,
            });
        }
        router.push('/login');
    }else{
        if(Util.chenkVuexMenu() || to.name === 'login'){
            next();
        }else{
            Request.POST('/menu').then( response => {
                Store.commit({
                    type:'storeMenu',
                    data:response.data,
                });
                next()
            })
        }

    }
});
export default router ;





