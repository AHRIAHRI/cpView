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
        {path: '/error', component:Util.loadComponents('/error')},
        {path: '/', name: 'home',component: Util.loadComponents('/base/menu'),},
        
        // 对于不存在的请求,跳转到主页,并且重新加载组件路由。
        {path: '*', redirect: '/' ,},
    ]
}) ;

// 对所有的路由进行检查和统一分配 , 如果验证没通过则返回登录界面
router.beforeResolve((to,from,next)=>{
    if(to.name !== 'login' && ! Util.checkLogin() ) {
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





