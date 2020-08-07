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
    mqttArr: [],
    client: {},
  },
  mutations: {
    setMenuIndex(state, value) {
      state.menuIndex = value;
    },
    setMqttObj(state, obj) {
      state.mqttArr.push(obj);
    },
    setClient(state, client) {
      state.client = client;
    },
  },
  modules,
  plugins: [
    createPersistedState(),
    // createSharedMutations()
  ],
  strict: false,
})