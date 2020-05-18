import { JSON } from '@/modules/shared/utils/types'

class BacteriaFilterItem {
  constructor(
    public id: number,
    public name: string,
    public type?: string,
  ) { }

  static fromResponse(response: JSON): BacteriaFilterItem | BacteriaFilterItem[] {
    if (Array.isArray(response)) {
      return response.map(BacteriaFilterItem.fromJson)
    }

    return BacteriaFilterItem.fromJson(response)
  }

  static fromJson(json: JSON): BacteriaFilterItem {
    const { id, name, type } = json

    if (!id) {
      throw new Error('BacteriaFilterItem Id cannot be undefined')
    }

    return new BacteriaFilterItem(id, name, type)
  }
}

export default BacteriaFilterItem
