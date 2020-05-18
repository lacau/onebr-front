import store from '@/main/store'

import actions from './actions'
import mutations from './mutations'
import getters from './getters'
import state from './state'

store.registerModule('auth', {
  namespaced: true,
  actions,
  getters,
  mutations,
  state,
})
