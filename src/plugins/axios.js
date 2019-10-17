import axios from 'axios'
import { path, equals, is, compose, prop } from 'ramda'
import { Message } from 'element-ui'
import { API_URL } from '@/constants/api'
import VueRouter from '@/plugins/vue-router'
import * as ROUTES from '@/constants/routes'
import toCamelCase from '../helpers/toCamelCase'

const INTERNAL_ERROR = 500
const CONTENT_TYPE_JSON = 'application/json'

const responseToCamelCase = (data, response) => {
  const responseContentType = path(['content-type'], response)

  if (equals(CONTENT_TYPE_JSON, responseContentType)) {
    return toCamelCase(JSON.parse(data))
  }

  if (is(Object, data) || is(Array, data)) {
    return toCamelCase(data)
  }

  return data
}

const errorInterceptors = error => {
  const status = path(['response', 'status'], error)

  if (equals(INTERNAL_ERROR, status)) {
    return VueRouter.push(ROUTES.INTERNAL_SERVER_ERROR_URL)
  }

  if (!status) {
    return Message.error({
      message: 'Network connection error'
    })
  }

  return Promise.reject(error)
}

axios.defaults.transformResponse = [responseToCamelCase]

axios.defaults.baseURL = API_URL

axios.interceptors.response.use(
  response => response,
  errorInterceptors
)

export const getPayloadFromSuccess = prop('data')
export const getPayloadFromError = compose(
  data => Promise.reject(data),
  path(['response', 'data'])
)

export default axios
