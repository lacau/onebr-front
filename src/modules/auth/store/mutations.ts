import { MutationTree } from 'vuex'
import { JSON } from '@/modules/shared/utils/types'
import { EAuthStatus, AuthState } from './state'

const mutations: MutationTree<AuthState> = {
  setToken(state, token: string) {
    state.token = token
  },
  setStatus(state, status: EAuthStatus) {
    state.status = status
  },
  setUser(state, user: JSON) {
    state.user = user
  },
}

export default mutations
