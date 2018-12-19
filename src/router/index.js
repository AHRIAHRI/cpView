import Vue from 'vue'
import Router from 'vue-router'
import Util from '../mode/util';


Vue.use(Router);
const router = new Router({
  mode:'history',
  routes: [
    {path: '/login', name: 'login', component: Util.loadComponents('/login')},
    {path: '/', component: Util.loadComponents('/base/menu'),
      children:Util.generateRouteComponents(),
    },
    { path: '*', component: {template:'<div>404页面</div>' } },

  ]
}) ;

// 对所有的路由进行检查和统一分配 , 如果验证没通过则返回登录界面
router.beforeEach((to,from,next)=>{
//   console.log('to:'+JSON.stringify(to)+"\n"+'from:'+JSON.stringify(from));
//   // if(to.path != '/login'){
//   //   next({path:'/login'});
//   // }else {
    next();
//   // }
});


export default router ;





