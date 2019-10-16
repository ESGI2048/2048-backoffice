import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Buefy from 'buefy'

import { library } from '@fortawesome/fontawesome-svg-core'
// internal icons
import { faCog, faCalendar, faRedo, faPlus, faMinus, faExclamationCircle, faUpload, faCheck, faTrash, faCalendarDay, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faCog, faCalendar, faRedo, faPlus, faMinus, faExclamationCircle, faUpload, faCheck, faTrash, faCalendarDay, faAngleLeft, faAngleRight)
Vue.component('vue-fontawesome', FontAwesomeIcon)

require('./scss/app.scss')

Vue.config.productionTip = false
Vue.use(Buefy, {
  defaultIconComponent: 'vue-fontawesome',
  defaultIconPack: 'fas'
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
