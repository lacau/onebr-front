import { GetterTree } from 'vuex'
import { SharedState } from './state'

const getters: GetterTree<SharedState, unknown> = {
  species(state) {
    return state.species
  },
}

export default getters
