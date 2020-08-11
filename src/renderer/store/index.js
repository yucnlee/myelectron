import Vue from 'vue'
import Vuex from 'vuex'

import {
  createPersistedState,
  createSharedMutations
} from 'vuex-electron'

import modules from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    menuIndex: 999,
    mqttObj: [],
    client: {},
    mode: 0,
  },
  mutations: {
    setMenuIndex(state, value) {
      state.menuIndex = value;
    },
    setMqttObj(state, obj) {
      state.mqttObj = obj;
    },
    setClient(state, client) {
      state.client = client;
    },
    setMode(state, mode) {
      state.mode = mode;
    }
  },
  modules,
  plugins: [
    createPersistedState(),
    // createSharedMutations()
  ],
  strict: false,
})