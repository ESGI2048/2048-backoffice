import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '*', redirect: '/login' },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "about" */ './views/Login.vue')
    },
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
