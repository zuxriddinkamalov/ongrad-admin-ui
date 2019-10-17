/* ============
 * Vue Router
 * ============
 *
 * The official Router for Vue.js. It deeply integrates with Vue.js core
 * to make building Single Page Applications with Vue.js a breeze.
 *
 * http://router.vuejs.org/en/index.html
 */

import Vue from 'vue'
import { equals } from 'ramda'
import VueRouter from 'vue-router'
import routes from '@/routes'

Vue.use(VueRouter)

export const router = new VueRouter({
  mode: 'history',
  scrollBehavior: function (to, from, savedPosition) {
    if (from && to.name === from.name && equals(to.params, from.params)) {
      return
    }
    return savedPosition || { x: 0, y: 0 }
  },
  routes
})

Vue.router = router

export default router
