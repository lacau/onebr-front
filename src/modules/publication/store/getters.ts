import Publication from '@/modules/shared/entities/Publication'
import { Pageable } from '@/modules/shared/entities/Pagination'

import { PublicationState } from './state'

export default {
  publications(state: PublicationState): Publication[] {
    return state.publications
  },
  pageable(state: PublicationState): Pageable|undefined {
    return state.pageable
  },
}
