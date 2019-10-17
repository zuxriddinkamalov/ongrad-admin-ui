import { fromPairs, filter, toPairs } from 'ramda'

export const omitEmpty = (obj) => fromPairs(
  filter(pair => {
    if (pair[1]) return pair
  }, toPairs(obj))
)
