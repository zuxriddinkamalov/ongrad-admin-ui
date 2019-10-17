import Vue from 'vue'

/* ============
 * Plugins
 * ============
 *
 * Import plugins.
 */
import './plugins/vuex'
import './plugins/element-ui'
import './plugins/vuex-router-sync'
import './plugins/vue-rx'
import router from './plugins/vue-router'

/* ============
 * Main App
 * ============
 *
 * Last but not least, we import the main application.
 */
import App from './App.vue'
import store from '@/store'

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
