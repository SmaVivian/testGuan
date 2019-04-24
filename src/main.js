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
import '@/utils/filters'
Vue.prototype.$http = request
Vue.prototype.$common = common

// import '../public/ueditor1/ueditor.config.js'
// import '../public/ueditor1/ueditor.all.js'
// import '../public/ueditor1/lang/zh-cn/zh-cn.js'
// import '../public/ueditor1/ueditor.parse.min.js'
// import uPase from '../public/ueditor1/ueditor.parse.js';

// import VueSocketio from 'vue-socket.io';
// import socketio from 'socket.io-client';
// // Vue.use(VueSocketio, socketio('ws://127.0.0.1:8000'));//与socket服务端链接
// Vue.use(VueSocketio, socketio('http://192.168.5.208:8000'));//与socket服务端链接

router.beforeEach((to, from, next) => {
  store.state.user.noScrollY = false
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
