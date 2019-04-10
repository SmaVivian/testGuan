import Vue from 'vue'
import 'babel-polyfill'
import ElementUI from 'element-ui'

import App from './App.vue'
import router from './router'
import store from './store'
import Cookies from 'js-cookie'

import '@/icons' // svg icon
import {common} from '@/utils/util'
import request from '@/utils/request'
Vue.prototype.$http = request
Vue.prototype.$common = common

router.beforeEach((to, from, next) => {
  // 页面刷新时，重新赋值token、userid
  if (Cookies.get('userid')) {
    store.commit('SET_USER_INFO', {
      token: Cookies.get('token'),
      userid: Cookies.get('userid'),
      userName: Cookies.get('userName'),
      headImg: Cookies.get('headImg'),
      phone: Cookies.get('phone'),
    })
  }
  next()
})

Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
