/* eslint-disable */
// The Vue build version to load with the `import` command
// has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

/**
 * 加载iView插件
 */
import iView  from 'iview';
import 'iview/dist/styles/iview.css' ;
Vue.use(iView);


/**
 *  Load my custom plugins
 *  global component and same object
 */
import plugin from './mode';
Vue.use(plugin);

Vue.config.productionTip = false ;
var app1 = new Vue({
    el: '#app',
    router,
    components: {App},
    template: '<App/>',
    render: h => h(App),
});



