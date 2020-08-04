import Vue from 'vue'
import Vuex from 'vuex'

import { createPersistedState, createSharedMutations } from 'vuex-electron'

import modules from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    menuIndex:999,
  },
  mutations: {
    setMenuIndex(state,value) {
        state.menuIndex = value;
    },
  },
  modules,
  plugins: [
    createPersistedState(),
    // createSharedMutations()
  ],
  strict: process.env.NODE_ENV !== 'production'
})
