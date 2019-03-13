import Vue from 'vue'
import 'babel-polyfill'
import ElementUI from 'element-ui'

import App from './App.vue'
import router from './router'
import store from './store'

import '@/icons' // svg icon
import {common} from '@/utils/util'
// import request from '@/utils/request'

Vue.prototype.common = common

Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
