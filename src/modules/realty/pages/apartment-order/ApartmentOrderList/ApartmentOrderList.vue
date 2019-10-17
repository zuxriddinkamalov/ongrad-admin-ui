<template>
  <div>
    <button @click="push">Filter</button>
    <button @click="push1">V</button>
    {{list}}
  </div>
</template>

<script>
import { withFetchList } from '~/mixins/withFetchList'
import * as ACTION from '@/constants/ActionTypes'

export default {
  name: 'ApartmentOrderList',
  config: {
    listAction: ACTION.GET_APARTMENT_ORDER_LIST_ACTION,
    namespace: ACTION.REALTY,
    key: 'apartmentOrderList'
  },
  methods: {
    push: function () {
      this.$router.push({
        query: {
          a: Math.floor(Math.random() * 100000)
        }
      })
    },
    push1: function () {
      this.$router.push({
        query: {
          search: Math.floor(Math.random() * 100000)
        }
      })
    }
  },
  created () {
    // console.warn('CHILD')
    // console.warn(this.$options)
  },
  mixins: [withFetchList]
}
</script>
