import { JSON } from '@/modules/shared/utils/types'

import ProfileImage from './ProfileImage'

class UserProfile {
  constructor(
    public image?: ProfileImage,
    public name: string = '',
  ) {}

  static fromResponse(response: JSON): UserProfile {
    return UserProfile.fromJson(response)
  }

  static fromJson(json: JSON): UserProfile {
    const instance = new UserProfile()

    if (json.image) instance.image = ProfileImage.fromJson(json.image)
    if (json.name) instance.name = json.name

    return instance
  }
}

export default UserProfile
