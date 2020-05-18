import {
  cloneDeep, omitBy, isEmpty, isNil, isObject,
} from 'lodash'
import { JSON } from '@/modules/shared/utils/types'

import Antibiogram from './Antibiogram'
import City from './City'
import ClermontTyping from './ClermontTyping'
import HeavyMetal from './HeavyMetal'
import Origin from './Origin'
import Plasmidome from './Plasmidome'
import Region from './Region'
import Resistome from './Resistome'
import Sequencer from './Sequencer'
import Serotype from './Serotype'
import Serovar from './Serovar'
import Source from './Source'
import Specie from './Specie'
import Virulome from './Virulome'

class Experiment {
  access_no_gb?: string

  assembler?: string

  barcode?: string

  contigs_no?: number

  date_of_assembly?: string

  date?: string

  fim_type?: string

  genome_bp?: number

  geolocation_lat?: number

  geolocation_long?: number

  host?: string

  id?: number

  identification?: string

  klocus?: string

  paper_published?: string

  researcher_name?: string

  sequencing_date?: string

  st?: string

  valid_month?: string

  wzc?: string

  wzi?: string

  antibiogram: Antibiogram = new Antibiogram()

  city: City = new City()

  clermont_typing: ClermontTyping = new ClermontTyping()

  origin: Origin = new Origin()

  region: Region = new Region()

  resistome: Resistome = new Resistome()

  sequencer: Sequencer = new Sequencer()

  serotype: Serotype = new Serotype()

  serovar: Serovar = new Serovar()

  source: Source = new Source()

  specie: Specie = new Specie()

  heavy_metal: HeavyMetal[] = []

  plamidomes: Plasmidome[] = []

  virulomes: Virulome[] = []

  private constructor(json: JSON) {
    Object.assign(this, omitBy(json, isNil))
  }

  static fromResponse(response: JSON): Experiment {
    return new Experiment(response)
  }

  static empty(): Experiment {
    return new Experiment({})
  }

  clone(): Experiment {
    return cloneDeep(this)
  }

  toServer() {
    const obj = omitBy(this, (value) => {
      if (!value) return true
      if (isObject(value) && isEmpty(value)) return true
      if (isNil(value)) return true

      return false
    })

    if (obj.city && !obj.city.id) {
      delete obj.city
    }

    if (obj.serotype && isEmpty(obj.serotype.antigen_h)) {
      delete obj.serotype.antigen_h
    }

    if (obj.serotype && isEmpty(obj.serotype.antigen_o)) {
      delete obj.serotype.antigen_o
    }

    if (isEmpty(obj.serotype)) {
      delete obj.serotype
    }

    return obj
  }
}

export default Experiment
