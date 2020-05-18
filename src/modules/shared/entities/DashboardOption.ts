import { JSON } from '@/modules/shared/utils/types'

class DashboardOption {
  constructor(
    public key: string,
    public name: string,
  ) { }

  static fromResponse(response: JSON): DashboardOption | DashboardOption[] {
    if (Array.isArray(response.items)) {
      return response.items.map(DashboardOption.fromJson)
    }

    return DashboardOption.fromJson(response)
  }

  static fromJson(json: JSON): DashboardOption {
    const { key, name } = json

    return new DashboardOption(key, name)
  }
}

export default DashboardOption
