import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        count: 111,
        menu:[],
    },
    mutations: {
        storeMenu (state ,payload) {
            state.menu = payload.data;
        },
    },
    
})
