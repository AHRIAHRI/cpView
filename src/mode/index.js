import Util from './util';
import request from "./request";
import store from "../store";

import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'




export default {
    install:function (Vue) {
        
        /**
         * Add costom object to Vue Prototype
         */

        Vue.prototype.$Util = Util ;
        Vue.prototype.$API = request ;
        Vue.prototype.$MyStore = store ;
    
    
        // Vue.component('CustomData',Util.loadComponents('/base/CustomData'));
        // Vue.component('CustomModelShowTable',Util.loadComponents('/base/CustomModelShowTable'));
        /**
         * AutoLoad base global component
         * path , is check subdirectory,RegEx
         */
        const requireComponent = require.context('../components/base', false, /[A-Z]\w+\.(vue|js)$/);
        requireComponent.keys().forEach(fileName => {
            // Get componentConfig
            const componentConfig = requireComponent(fileName) ;
            // Get file Name
            const componentName = upperFirst(
                camelCase(
                    // 剥去文件名开头的 `./` 和结尾的扩展名
                    fileName.replace(/^\.\/(.*)\.\w+$/, '$1')
                )
            ) ;


            Vue.component(
                componentName,
                // 如果这个组件选项是通过 `export default` 导出的，
                // 那么就会优先使用 `.default`，
                // 否则回退到使用模块的根。
                componentConfig.default || componentConfig
            )
        })
    }
};
