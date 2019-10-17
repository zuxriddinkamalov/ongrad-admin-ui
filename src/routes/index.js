/* ============
 * Routes File
 * ============
 *
 */

import { getApartmentOrderListContainer } from '../modules/realty/containers'

export default [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "apartment" */'../modules/realty/pages/Apartment.vue')
  },
  {
    path: '/realty',
    component: getApartmentOrderListContainer
  },
  {
    path: '/*',
    redirect: '/'
  }
]
