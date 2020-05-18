import { JSON } from '@/modules/shared/utils/types'

class Coordinate {
  constructor(
    public id: number,
    public latitude: number,
    public longitude: number,
    public selected: boolean = false,
  ) { }

  static fromResponse(response: JSON): Coordinate | Coordinate[] {
    if (Array.isArray(response.coordinates)) {
      return response.coordinates.map(Coordinate.fromJson)
    }

    return Coordinate.fromJson(response)
  }

  static fromJson(json: JSON): Coordinate {
    const { id, latitude, longitude } = json

    if (!id) {
      throw new Error('Coordinate Id cannot be undefined')
    }

    if (!latitude) {
      throw new Error('Coordinate latitude cannot be undefined')
    }

    if (!longitude) {
      throw new Error('Coordinate longitude cannot be undefined')
    }

    return new Coordinate(id, latitude, longitude)
  }
}

export default Coordinate
