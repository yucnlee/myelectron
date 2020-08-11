import Vue from 'vue'
import axios from 'axios'
import antd from 'ant-design-vue'
import {
  Form
} from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import store from './store'
import vueElectron from 'vue-electron'
const ipcRenderer = require('electron').ipcRenderer

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(antd)
// Vue.use(element)
Vue.prototype.$form = Form


/* eslint-disable no-new */
new Vue({
  components: {
    App
  },
  router,
  store,
  template: '<App/>'
}).$mount('#app')