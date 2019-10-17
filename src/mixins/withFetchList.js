import { mapState } from 'vuex'
import { path, prop } from 'ramda'
import { distinctUntilChanged } from 'rxjs/operators'
import { Message } from 'element-ui'
import { DEFAULT_PICK_PARAMS, isEqualSearch } from '@/helpers/isEquals'

export const withFetchList = {
  data: () => {
    return {
      loading: false
    }
  },
  computed: {
    ...mapState({
      route: state => state.route,
      list (state) {
        const {
          config: {
            namespace,
            key = 'list'
          }
        } = this.$options
        return namespace ? state[namespace][key] : state[key]
      }
    })
  },
  mounted () {
    const {
      config: {
        listAction,
        namespace,
        pickParams = DEFAULT_PICK_PARAMS
      }
    } = this.$options
    const ACTION_TYPE = namespace ? `${namespace}/${listAction}` : listAction

    this.$watchAsObservable('route', {
      immediate: true
    })
      .pipe(
        distinctUntilChanged(
          isEqualSearch(pickParams),
          path(['newValue', 'query'])
        )
      )
      .subscribe(
        ({ newValue, oldValue }) => {
          const params = {
            page: 1,
            per_page: 10,
            ...prop('query', newValue)
          }
          this.loading = true

          this.$store.dispatch(ACTION_TYPE, params).catch(error => Message.error({
            message: error
          })).finally(() => {
            this.loading = false
          })
        },
        err => console.error(err),
        () => console.log('complete')
      )
  }
}
