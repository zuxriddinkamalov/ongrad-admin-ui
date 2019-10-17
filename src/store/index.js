/* ============
 * Vuex Store
 * ============
 *
 * The store of the application.
 *
 * http://vuex.vuejs.org/en/index.html
 */

import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

// Namespaces
import { REALTY } from '@/constants/ActionTypes'

// Modules
import realty from './modules/realty'
import general from './modules/general'

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  ...general,

  modules: {
    [REALTY]: realty
  },

  /**
   * If strict mode should be enabled.
   */
  strict: debug,
  devtools: debug,

  /**
   * Plugins used in the store.
   */
  plugins: debug ? [createLogger()] : []
})
