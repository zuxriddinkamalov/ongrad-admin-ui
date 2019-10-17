import {
  compose,
  pick,
  equals,
  curry,
  either,
  not,
  isEmpty,
  filter,
  isNil
} from 'ramda'

export const DEFAULT_PICK_PARAMS = ['search', 'page', 'per_page', 'ordering']

const getPickParamsFromSearch = (pickParams, search) =>
  compose(
    filter(
      compose(
        not,
        either(isNil, isEmpty)
      )
    ),
    pick(pickParams)
  )(search)

export const isEqualSearch = curry((pickParams, prev, current) => {
  return equals(
    getPickParamsFromSearch(pickParams, prev),
    getPickParamsFromSearch(pickParams, current)
  )
}
)
