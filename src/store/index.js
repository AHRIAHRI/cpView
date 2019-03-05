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
        allPerjectPermission:false,
        progress:{
            status:false,
            start:false,
        },
        // 翻译的内容
        render:{},
    },
    mutations: {
        storeMenu (state ,payload) {
            state.menu = payload.data;
        },
        sotreUserInfo(state,payload){
            state.selectProject = payload.selectProject;
            state.selectProjectName = payload.selectProjectName;
            state.userName = payload.userName;
        },
        startLoadstatus(state,payload){
            state.progress.start = payload.start;
            state.progress.status = payload.status;
        },
        modifySelectProject(state,payload){
            state.allPerjectPermission = payload.status
        }

    },
    
})
