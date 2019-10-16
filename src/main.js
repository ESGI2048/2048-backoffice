import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Buefy from 'buefy'

import { library } from '@fortawesome/fontawesome-svg-core'
// internal icons
import { faCog, faCalendar, faRedo, faPlus, faMinus, faExclamationCircle, faUpload, faCheck, faTrash, faCalendarDay, faAngleLeft, faAngleRight, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faCog, faCalendar, faRedo, faPlus, faMinus, faExclamationCircle, faUpload, faCheck, faTrash, faCalendarDay, faAngleLeft, faAngleRight, faEye, faEyeSlash)
Vue.component('vue-fontawesome', FontAwesomeIcon)

require('./scss/app.scss')

Vue.prototype.$axios = require('axios').create({
  baseURL: 'http://localhost:8888/',
  headers: { 'Cache-Control': 'no-cache' },
  timeout: 1000
})

Vue.prototype.$axios.interceptors.response.use(function (response) {
  return response
}, function (error) {
  if (error.response && error.response.status === 403) {
    Vue.prototype.$auth.username = ''
    Vue.prototype.$auth.password = ''
    router.push({ name: 'login' })
  }
  return Promise.reject(error)
})

Vue.prototype.$auth = { username: '', password: '' }

Vue.config.productionTip = false
Vue.use(Buefy, {
  defaultIconComponent: 'vue-fontawesome',
  defaultIconPack: 'fas'
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'login' && !Vue.prototype.$auth.username && !Vue.prototype.$auth.password) next('/login')
  else next()
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
