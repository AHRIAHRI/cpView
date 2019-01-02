/* eslint-disable */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import iView  from 'iview';
import 'iview/dist/styles/iview.css'

Vue.config.productionTip = false ;

// 加载组件
// data=()=>require('./components/base/top')
// Vue.component('cpData-top',()=>import('./components/base/top'));

Vue.use(iView);
/* eslint-disable no-new */


var app1 = new Vue({
    el: '#app',
    router,
    components: {App},
    template: '<App/>',
    render: h => h(App),
});



