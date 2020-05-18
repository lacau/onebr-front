import { MutationTree } from 'vuex'

import BacteriaFilterItem from '@/modules/shared/entities/BacteriaFilterItem'

import { SharedState } from './state'


const mutations: MutationTree<SharedState> = {
  setSpecies(state, species: BacteriaFilterItem[]) {
    state.species = species
  },
}

export default mutations
