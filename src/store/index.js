import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        count: 111,
        menu:[],
        selectProject:'',
        selectProjectName:'',
        userName:'',
    },
    mutations: {
        storeMenu (state ,payload) {
            state.menu = payload.data;
        },
        sotreUserInfo(state,payload){
            state.selectProject = payload.selectProject;
            state.selectProjectName = payload.selectProjectName;
            state.userName = payload.userName;
        }
    },
    
})
