import { JSON } from '@/modules/shared/utils/types'

class ProfileImage {
  private readonly baseUrl = process.env.VUE_APP_API_URL

  constructor(
    public id: number,
    public path: string,
    public name: string,
  ) { }

  static fromJson(json: JSON): ProfileImage {
    const { id, path, name } = json

    return new ProfileImage(id, path, name)
  }

  get src(): string {
    return `${this.baseUrl}${this.path}/${this.name}`
  }
}

export default ProfileImage
