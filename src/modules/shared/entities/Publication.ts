import { JSON } from '@/modules/shared/utils/types'

export const enum PublicationType {
  video, text
}

class Publication {
  constructor(
    public id?: number,
    public date?: Date,
    public order?: number,
    public titleEn?: string,
    public titlePt?: string,
    public description: string = '',
    public link: string = '',
    public title: string = '',
    public type: PublicationType = PublicationType.text,
  ) { }

  static fromResponse(response: JSON): Publication | Publication[] {
    if (Array.isArray(response.content)) {
      return response.content.map(Publication.fromJson)
    }

    return Publication.fromJson(response)
  }

  static fromJson(json: JSON): Publication {
    const instance = new Publication()

    if (json.id) instance.id = json.id
    if (json.date) instance.date = new Date(json.date)
    if (json.description) instance.description = json.description
    if (json.link) instance.link = json.link
    if (json.title) instance.title = json.title
    if (json.type) instance.type = json.type
    if (json.order) instance.order = json.order
    if (json.titleEn) instance.titleEn = json.titleEn
    if (json.titlePt) instance.titlePt = json.titlePt

    return instance
  }
}

export default Publication
