import { GetterTree } from 'vuex'
import { AuthState } from './state'

const getters: GetterTree<AuthState, unknown> = {
  isAuthenticated: (state) => !!state.token,
  authStatus: (state) => state.status,
  isAdmin: (state) => state.user?.admin,
  firstName: (state) => state.user?.name.split(' ')[0] ?? '',
  userId: (state) => state.user?.id,
}

export default getters
