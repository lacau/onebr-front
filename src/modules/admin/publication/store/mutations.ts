import { MutationTree } from 'vuex'

import PublicationFilter from '@/modules/shared/entities/PublicationFilter'
import Publication from '@/modules/shared/entities/Publication'
import PublicationModel from '@/modules/shared/entities/form-models/Publication'

import { Pageable } from '@/modules/shared/entities/Pagination'
import { PublicationState } from './state'

const mutations: MutationTree<PublicationState> = {
  setPublications(state, publications: Publication[]) {
    state.publications = publications
  },
  setFilter(state, filter: PublicationFilter) {
    state.filter = filter
  },
  setPageable(state, pageable: Pageable) {
    state.pageable = pageable
  },
  setFormModel(state, formModel: PublicationModel|null) {
    state.formModel = formModel
  },
}

export default mutations
