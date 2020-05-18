import { JSON } from '@/modules/shared/utils/types'

class Contributor {
  constructor(
    public description: string = '',
    public name: string = '',
    public order: number = 0,
  ) { }

  static fromResponse(response: JSON): Contributor | Contributor[] {
    if (Array.isArray(response.contributors)) {
      return response.contributors.map(Contributor.fromJson)
    }

    return Contributor.fromJson(response)
  }

  static fromJson(json: JSON): Contributor {
    const instance = new Contributor()

    if (json.description) instance.description = json.description
    if (json.name) instance.name = json.name
    if (json.order) instance.order = json.order

    return instance
  }
}

export default Contributor
