interface PublicationFilterInterface {
  searchTerm?: string;
  sort?: string[];
  page?: number;
  size?: number;
}

class PublicationFilter implements PublicationFilterInterface {
  searchTerm?: string

  sort = ['date', 'asc']

  page = 1

  size = 10

  constructor(filter?: PublicationFilterInterface) {
    Object.assign(this, filter)
  }

  static empty() {
    return new PublicationFilter()
  }

  copyWith(filter: PublicationFilterInterface) {
    return new PublicationFilter({ ...this, ...filter })
  }

  toServer() {
    const { sort, page, ...rest } = this
    return {
      ...rest,
      sort: sort?.join(),
      page: page - 1,
    }
  }
}

export default PublicationFilter
