import { JSON } from '@/modules/shared/utils/types'

import Resistome from './Resistome'

class ExperimentListItem {
  constructor(
    public id: number,
    public resistome: Resistome = new Resistome(),
    public date: string = '-',
    public cityName: string = '-',
    public host: string = '-',
    public identification: string = '-',
    public originNameEn: string = '-',
    public originNamePt: string = '-',
    public sourceNameEn: string = '-',
    public sourceNamePt: string = '-',
    public st: string = '-',
    public specieName: string = '-',
  ) { }

  static fromResponse(response: JSON): ExperimentListItem | ExperimentListItem[] {
    if (Array.isArray(response.content)) {
      return response.content.map(ExperimentListItem.fromJson)
    }

    return ExperimentListItem.fromJson(response)
  }

  static fromJson(json: JSON): ExperimentListItem {
    const { id } = json

    if (!id) {
      throw new Error('ExperimentListItem Id cannot be undefined')
    }

    const instance = new ExperimentListItem(id)

    if (json.resistome) instance.resistome = Resistome.fromJson(json.resistome)
    if (json.identification) instance.identification = json.identification
    if (json.st) instance.st = json.st
    if (json.cityName) instance.cityName = json.cityName
    if (json.originNameEn) instance.originNameEn = json.originNameEn
    if (json.originNamePt) instance.originNamePt = json.originNamePt
    if (json.sourceNameEn) instance.sourceNameEn = json.sourceNameEn
    if (json.sourceNamePt) instance.sourceNamePt = json.sourceNamePt
    if (json.host) instance.host = json.host
    if (json.date) instance.date = json.date
    if (json.specieName) instance.specieName = json.specieName

    return instance
  }
}

export default ExperimentListItem
