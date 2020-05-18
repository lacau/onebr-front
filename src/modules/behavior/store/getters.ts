import { GetterTree } from 'vuex'
import { SharedState } from './state'

const getters: GetterTree<SharedState, unknown> = {
  loadingVisible: (state) => state.loading.visible,
}

export default getters
