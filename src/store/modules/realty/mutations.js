/* ============
 * Mutations for the Realty module
 * ============
 *
 */

import { GET_APARTMENT_ORDER_LIST } from './mutation-types'

/* eslint-disable no-param-reassign */
export default {
  [GET_APARTMENT_ORDER_LIST] (state, payload) {
    state.apartmentOrderList = payload
  }
}
