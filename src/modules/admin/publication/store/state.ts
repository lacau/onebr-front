import Publication from '@/modules/shared/entities/Publication'
import PublicationFilter from '@/modules/shared/entities/PublicationFilter'
import PublicationModel from '@/modules/shared/entities/form-models/Publication'
import { Pageable } from '@/modules/shared/entities/Pagination'

export interface PublicationState {
  filter: PublicationFilter;
  pageable?: Pageable;
  publications: Publication[];
  formModel: PublicationModel|null;
}

const state: PublicationState = {
  filter: PublicationFilter.empty(),
  pageable: undefined,
  publications: [],
  formModel: null,
}

export default state
