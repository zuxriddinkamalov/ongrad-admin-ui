<template>
  <div>
    <el-row>
      <el-form ref="form" :model="filter" label-width="120px">
        <el-form-item label="Min price">
          <el-input v-model="filter.min_price" data-cy="min-price"></el-input>
        </el-form-item>
        <el-form-item label="Max price">
          <el-input v-model="filter.max_price" data-cy="max-price"></el-input>
        </el-form-item>
        <el-form-item label="Комнатность">
          <el-select
            v-model="filter.rooms"
            multiple
            filterable
            default-first-option
            placeholder="Комнатность"
            data-cy="rooms"
          >
            <el-option
              v-for="item in 10"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Build year">
          <el-col :span="11">
            <el-date-picker
              type="date"
              format="yyyy"
              value-format="yyyy-MM-dd"
              placeholder="Pick a date"
              v-model="filter.year_after"
              style="width: 100%;"
              data-cy="year-after"
            ></el-date-picker>
          </el-col>
          <el-col :span="11">
            <el-date-picker
              type="date"
              format="yyyy"
              value-format="yyyy-MM-dd"
              placeholder="Pick a date"
              v-model="filter.year_before"
              style="width: 100%;"
              data-cy="year-before"
            ></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="Этажность">
          <el-col :span="6">
            <el-checkbox v-model="filter.not_first_last" data-cy="not-first-last">не первый не последний</el-checkbox>
          </el-col>
          <el-col :span="9">
            <el-input v-model="filter.start_floor" data-cy="start-floor"></el-input>
          </el-col>
          <el-col :span="9">
            <el-input v-model="filter.last_floor" data-cy="last-floor"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="() => loadData()" data-cy="submit-button">filter</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <div>
      Квартиры
      По вашему запросу найдено квартир: <span data-cy="count-wrap">{{ count }}</span>
    </div>
    <el-row :gutter="20">
      <el-col :span="6" v-for="item in data" :key="item.id" data-cy="card-wrap">
        <el-card :body-style="{ padding: '0px' }">
          <div slot="header" class="clearfix">
            <span>{{ item.rooms }} комнатная</span>
          </div>
          <img :alt="item.address" src="https://picsum.photos/200/300" class="image" />
          <div style="padding: 14px;" class="text item">
            <div class="item text">Адрес: {{ item.address }}</div>
            <div class="item text">Цена: {{ item.price }} р.</div>
            <div class="item text">Год: {{ item.year }} р.</div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-pagination
      background
      :hide-on-single-page="true"
      layout="prev, pager, next"
      :page-size="filter.page_size"
      @current-change="loadData"
      :total="count">
    </el-pagination>
  </div>
</template>

<script>
import { path, compose, join, propOr } from 'ramda'
import { createNamespacedHelpers } from 'vuex'
import { omitEmpty } from '../../../helpers/objects'
const { mapState, mapActions } = createNamespacedHelpers('apartment')

export default {
  name: 'Apartment',
  data: function () {
    return {
      filter: {
        page_size: 4
      }
    }
  },
  mounted () {
    this.loadData()
  },
  methods: {
    ...mapActions(['getApartments']),
    loadData: function (page = 1) {
      const { filter } = this
      const rooms = compose(
        join(','),
        propOr([], 'rooms')
      )(filter)
      const params = omitEmpty({ ...filter, rooms, page })

      this.getApartments(params)
    }
  },
  computed: {
    ...mapState({
      data: state => path(['list', 'results'], state),
      count: state => path(['list', 'count'], state)
    })
  }
}
</script>

<style scoped>

</style>
