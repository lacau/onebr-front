import Publication from '@/modules/shared/entities/Publication'
import { Pageable } from '@/modules/shared/entities/Pagination'

export interface PublicationState {
  publications: Publication[];
  pageable?: Pageable;
}

const state: PublicationState = {
  publications: [],
  pageable: undefined,
}

export default state
