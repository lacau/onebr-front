import Publication from '@/modules/shared/entities/Publication'
import { Pageable } from '@/modules/shared/entities/Pagination'

import { PublicationState } from './state'

export default {
  setPublications(state: PublicationState, publications: Publication[]) {
    state.publications = publications
  },
  setPageable(state: PublicationState, pageable: Pageable) {
    state.pageable = pageable
  },
}
