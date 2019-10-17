import { Message } from 'element-ui'
import { prop } from 'ramda'

export const withDelete = {
  data: () => {
    return {
      loading: false
    }
  },
  methods: {
    onDelete (id) {
      const {
        config: {
          deleteAction,
          listAction,
          namespace
        }
      } = this.$options

      const params = {
        page: 1,
        per_page: 10,
        ...prop('query', this.route)
      }

      const dispatch = this.$store.dispatch
      const LIST_ACTION = namespace ? `${namespace}/${listAction}` : listAction
      const DELETE_ACTION = namespace ? `${namespace}/${deleteAction}` : deleteAction
      this.loading = true

      dispatch(DELETE_ACTION)
        .then(() => Message.success('Successfully removed'))
        .then(() => dispatch(LIST_ACTION, params))
        .catch(error => Message.error(error))
        .finally(() => {
          this.loading = false
        })
    }
  }
}
