import { JSON } from '@/modules/shared/utils/types'

import Pagination, { Pageable } from './Pagination'
import User from './User'

class UserPagination implements Pagination<User> {
  constructor(
    public content: User[],
    public pageable: Pageable,
  ) { }

  static fromResponse(response: JSON): UserPagination {
    const users = User.fromResponse(response) as []
    const pageable = Pageable.fromResponse(response)

    return new UserPagination(users, pageable)
  }
}

export default UserPagination
