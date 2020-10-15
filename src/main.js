/* eslint-disable no-new */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import axios from 'axios'
import store from './store'
import i18n from './i18n/langs/index'
import VideoPlayer from 'vue-video-player'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
Vue.use(ElementUI)
Vue.use(VideoPlayer)
Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.config.debug = true

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: {App},
  render: h => h(App),
  template: '<App/>'
})
// 异步请求前在header里加入token
axios.interceptors.request.use(
  config => {
    if (config.url === '/qmy/jwt/login' || config.url === '/qmy/jwt') { // 如果是登录和注册操作，则不需要携带header里面的token
    } else {
      if (sessionStorage.getItem('Authorization')) {
        config.headers.Authorization = sessionStorage.getItem('Authorization')
      }
    }
    return config
  },
  error => {
    return Promise.reject(error)
  })
// 异步请求后，判断token是否过期
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          sessionStorage.removeItem('Authorization')
          this.$router.push('/')
      }
    }
  }
)
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)) { // 判断该路由是否需要登录权限
    console.log('需要登录权限')
    if (sessionStorage.getItem('Authorization')) { // 判断当前的token是否存在
      console.log('浏览器存在token： ' + sessionStorage.getItem('Authorization'))
      next()
    } else {
      next({
        path: '/',
        query: {redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next()
  }
})
