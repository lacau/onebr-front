import { JSON } from '@/modules/shared/utils/types'

import Pagination, { Pageable } from './Pagination'
import Publication from './Publication'

class PublicationPagination implements Pagination<Publication> {
  constructor(
    public content: Publication[],
    public pageable: Pageable,
  ) { }

  static fromResponse(response: JSON): PublicationPagination {
    const publications = Publication.fromResponse(response) as []
    const pageable = Pageable.fromResponse(response)

    return new PublicationPagination(publications, pageable)
  }
}

export default PublicationPagination
