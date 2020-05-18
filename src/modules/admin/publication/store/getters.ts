import { GetterTree } from 'vuex'
import { PublicationState } from './state'

const getters: GetterTree<PublicationState, unknown> = {
  publications(state) {
    return state.publications
  },
  filter(state) {
    return state.filter
  },
  pageable(state) {
    return state.pageable
  },
  formModel(state) {
    return state.formModel
  },
}

export default getters
