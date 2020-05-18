import { JSON } from '@/modules/shared/utils/types'

import Pagination, { Pageable } from './Pagination'
import ExperimentListItem from './ExperimentListItem'

class ExperimentPagination implements Pagination<ExperimentListItem> {
  constructor(
    public content: ExperimentListItem[],
    public pageable: Pageable,
  ) { }

  static fromResponse(response: JSON): ExperimentPagination {
    const experiments = ExperimentListItem.fromResponse(response) as []
    const pageable = Pageable.fromResponse(response)

    return new ExperimentPagination(experiments, pageable)
  }
}

export default ExperimentPagination
