import { cloneDeep } from 'lodash'
import { JSON } from '@/modules/shared/utils/types'

class Publication {
  active?: boolean

  date?: string

  description_en?: string

  description_pt?: string

  id?: number

  link?: string

  order?: number

  title_en?: string

  title_pt?: string

  type = 'PUBLICATION'

  private constructor(json: JSON) {
    Object.assign(this, json)
  }

  static fromResponse(response: JSON): Publication {
    return new Publication(response)
  }

  static empty(): Publication {
    return new Publication({})
  }

  clone(): Publication {
    return cloneDeep(this)
  }

  toServer() {
    return this
  }
}

export default Publication
