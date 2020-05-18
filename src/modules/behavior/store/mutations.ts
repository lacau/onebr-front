import { MutationTree } from 'vuex'
import { SharedState } from './state'

const mutations: MutationTree<SharedState> = {
  enableLoading(state) {
    state.loading.visible = true
    state.loading.counter += 1
  },
  disableLoading(state) {
    if (state.loading.counter > 0) {
      state.loading.counter -= 1
    }
    if (state.loading.counter === 0) {
      state.loading.visible = false
    }
  },
}

export default mutations
