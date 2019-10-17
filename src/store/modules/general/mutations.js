/* ============
 * Mutations for the general state
 * ============
 *
 * The mutations that are available on the
 * general state.
 */

import {
  SET_INITIAL_STATE,
  RESET_INITIAL_STATE
} from './mutation-types'

/* eslint-disable no-param-reassign */
export default {
  [SET_INITIAL_STATE] (state, { key, value = null }) {
    state[key] = value
  },
  [RESET_INITIAL_STATE] (state, payload) {
  }
}
