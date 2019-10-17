const debug = process.env.NODE_ENV !== 'production'
export const API_HOST = debug ? 'http://127.0.0.1:8000' : 'https://ongrad.herokuapp.com'
export const API_ROOT = 'api'
export const API_VERSION = 'v1'
export const API_URL = `${API_HOST}/${API_ROOT}/${API_VERSION}`

// Realty API
const REALTY = 'realty'
const APARTMENT_ORDER = `${REALTY}/apartment-order`
export const GET_APARTMENT_ORDER_LIST = `/${APARTMENT_ORDER}/`
export const GET_APARTMENT_ORDER_CREATE = `/${APARTMENT_ORDER}/`
export const GET_APARTMENT_ORDER_DETAIL = `/${APARTMENT_ORDER}/%d/`
export const GET_APARTMENT_ORDER_DELETE = `/${APARTMENT_ORDER}/%d/`
export const GET_APARTMENT_ORDER_UPDATE = `/${APARTMENT_ORDER}/%d/`
