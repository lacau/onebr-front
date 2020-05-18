import { GetterTree } from 'vuex'
import { UserState } from './state'

const mutations: GetterTree<UserState, unknown> = {
  users(state) {
    return state.users
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

export default mutations
