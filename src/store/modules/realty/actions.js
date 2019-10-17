/* ============
 * Actions for the Realty module
 * ============
 *
*/

import axios, { getPayloadFromSuccess, getPayloadFromError } from '@/plugins/axios'
import * as API from '@/constants/api'
import { GET_APARTMENT_ORDER_LIST_ACTION } from '@/constants/ActionTypes'
import { GET_APARTMENT_ORDER_LIST } from './mutation-types'

export default {
  [GET_APARTMENT_ORDER_LIST_ACTION] ({ commit }, params) {
    return axios.get(API.GET_APARTMENT_ORDER_LIST, { params })
      .then(response => commit(GET_APARTMENT_ORDER_LIST, getPayloadFromSuccess(response)))
      .catch(getPayloadFromError)
  }
}
