import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '*', redirect: '/components' },
    {
      path: '/components',
      name: 'components',
      component: () => import(/* webpackChunkName: "about" */ './views/Components.vue')
    },
    {
      path: '/events',
      name: 'events',
      component: () => import(/* webpackChunkName: "about" */ './views/Events.vue')
    }
  ]
})
