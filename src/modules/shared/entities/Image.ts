import { JSON } from '@/modules/shared/utils/types'

class Image {
  private readonly baseUrl = process.env.VUE_APP_API_URL

  constructor(
    public id: number,
    public path: string,
    public name: string,
    public tooltip: string = '',
  ) { }

  static fromResponse(response: JSON): Image | Image[] {
    if (Array.isArray(response.images)) {
      return response.images.map(Image.fromJson)
    }

    return Image.fromJson(response)
  }

  static fromJson(json: JSON): Image {
    const { tooltip, image: { id, path, name } } = json

    return new Image(id, path, name, tooltip)
  }

  get src(): string {
    return `${this.baseUrl}${this.path}/${this.name}`
  }
}

export default Image
