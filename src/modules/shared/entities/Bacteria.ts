import { JSON } from '@/modules/shared/utils/types'

class Bacteria {
  constructor(
    public image: string,
    public name: string,
    public origin: string,
    public scientificName: string,
    public type: string,
  ) { }

  static fromJson(json: JSON): Bacteria {
    const {
      image, name, origin, scientificName, type,
    } = json

    return new Bacteria(
      image,
      name,
      origin,
      scientificName,
      type,
    )
  }
}

export default Bacteria
