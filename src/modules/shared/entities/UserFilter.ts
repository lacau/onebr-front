interface UserFilterInterface {
  searchTerm?: string;
  sort?: string[];
  page?: number;
  size?: number;
}

class UserFilter implements UserFilterInterface {
  searchTerm?: string

  sort = ['name', 'asc']

  page = 1

  size = 10

  constructor(filter?: UserFilterInterface) {
    Object.assign(this, filter)
  }

  static empty() {
    return new UserFilter()
  }

  copyWith(filter: UserFilterInterface) {
    return new UserFilter({ ...this, ...filter })
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

export default UserFilter
