import { map } from 'lodash'
import { JSON } from '@/modules/shared/utils/types'

interface Specie {
  id: number;
  name: string;
}

export interface UserRole {
  name: string;
}

class User {
  constructor(
    public id: number,
    public active: boolean = false,
    public email: string = '',
    public name: string = '',
    public roles: UserRole[] = [],
    public species: Specie[] = [],
  ) {}

  static fromResponse(response: JSON): User | User[] {
    if (Array.isArray(response.content)) {
      return response.content.map(User.fromJson)
    }

    return User.fromJson(response)
  }

  static fromJson(json: JSON): User {
    const { id } = json
    if (!id) {
      throw new Error('User Id cannot be undefined')
    }

    const instance = new User(id)

    if (json.active) instance.active = json.active
    if (json.roles) instance.roles = json.roles
    if (json.species) instance.species = json.species
    if (json.profile) {
      instance.name = json.profile.name
      instance.email = json.profile.email
    }

    return instance
  }

  get specieFormatted(): string {
    if (this.species.length === 0) return '-'

    return map(this.species, 'name').join(',')
  }
}

export default User
