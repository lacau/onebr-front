import { MutationTree } from 'vuex'
import User from '@/modules/shared/entities/User'
import UserFilter from '@/modules/shared/entities/UserFilter'
import BacteriaFilterItem from '@/modules/shared/entities/BacteriaFilterItem'
import UserModel from '@/modules/shared/entities/form-models/User'

import { Pageable } from '@/modules/shared/entities/Pagination'
import { UserState } from './state'

const mutations: MutationTree<UserState> = {
  setUsers(state, users: User[]) {
    state.users = users
  },
  setFilter(state, filter: UserFilter) {
    state.filter = filter
  },
  setPageable(state, pageable: Pageable) {
    state.pageable = pageable
  },
  setFormModel(state, formModel: UserModel|null) {
    state.formModel = formModel
  },
  setSpecies(state, species: BacteriaFilterItem[]) {
    state.species = species
  },
}

export default mutations
