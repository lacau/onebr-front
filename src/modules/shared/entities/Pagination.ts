import { JSON } from '@/modules/shared/utils/types'

export class Pageable {
  constructor(
    public currentPage: number,
    public pageSize: number,
    public totalPages: number,
  ) { }

  static fromResponse(response: JSON): Pageable {
    const currentPage = response.number + 1

    return new Pageable(
      currentPage,
      response.size,
      response.totalPages,
    )
  }
}

export default interface Pagination<T> {
  content: T[];
  pageable: Pageable;
}
