import { cloneDeep } from 'lodash'
import { JSON } from '@/modules/shared/utils/types'

class User {
  password = ''

  active?: boolean

  email?: string

  id?: number

  name?: string

  species: number[] = []

  username?: string

  private constructor(json: JSON) {
    const { profile = {}, ...rest } = json

    Object.assign(this, {
      ...rest,
      email: profile.email,
      name: profile.name,
    })
  }

  static fromResponse(response: JSON): User {
    return new User(response)
  }

  static empty(): User {
    return new User({})
  }

  clone(): User {
    return cloneDeep(this)
  }

  toServer() {
    return this
  }
}

export default User
