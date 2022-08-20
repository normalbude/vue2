import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules/index.js'
import * as Types from '@/store/action-types'
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        tokens: []
    },
    mutations: {
        [Types.SET_TOKEN](state, token) {
            state.tokens = [...state.tokens, token]//存储token,页面切换可以让token依次执行
        },
        [Types.CLEAR_TOKEN](state) {
            state.tokens.forEach(token => token());//清除token
            state.tokens = []
        }
    },
    modules: {
        ...modules
    }
})

export default store