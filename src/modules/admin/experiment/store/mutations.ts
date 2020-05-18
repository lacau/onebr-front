import BacteriaFilter from '@/modules/shared/entities/BacteriaFilter'
import ExperimentListItem from '@/modules/shared/entities/ExperimentListItem'
import BacteriaFilterItem from '@/modules/shared/entities/BacteriaFilterItem'
import ExperimentModel from '@/modules/shared/entities/form-models/Experiment'

import { Pageable } from '@/modules/shared/entities/Pagination'
import { ExperimentState } from './state'

export default {
  setExperiments(state: ExperimentState, experiments: ExperimentListItem[]) {
    state.experiments = experiments
  },
  setFilter(state: ExperimentState, filter: BacteriaFilter) {
    state.filter = filter
  },
  setPageable(state: ExperimentState, pageable: Pageable) {
    state.pageable = pageable
  },
  setFormModel(state: ExperimentState, formModel: ExperimentModel|null) {
    state.formModel = formModel
  },
  setSpecies(state: ExperimentState, species: BacteriaFilterItem[]) {
    state.species = species
  },
  setPlasmidome(state: ExperimentState, plasmidome: BacteriaFilterItem[]) {
    state.plasmidome = plasmidome
  },
  setAntigenH(state: ExperimentState, antigenH: BacteriaFilterItem[]) {
    state.antigenH = antigenH
  },
  setAntigenO(state: ExperimentState, antigenO: BacteriaFilterItem[]) {
    state.antigenO = antigenO
  },
  setVirulome(state: ExperimentState, virulome: BacteriaFilterItem[]) {
    state.virulome = virulome
  },
  setHeavyMetal(state: ExperimentState, heavyMetal: BacteriaFilterItem[]) {
    state.heavyMetal = heavyMetal
  },
  setSerovar(state: ExperimentState, serovar: BacteriaFilterItem[]) {
    state.serovar = serovar
  },
  setClermontTyping(state: ExperimentState, clermontTyping: BacteriaFilterItem[]) {
    state.clermontTyping = clermontTyping
  },
  setSequencer(state: ExperimentState, sequencer: BacteriaFilterItem[]) {
    state.sequencer = sequencer
  },
  setCountries(state: ExperimentState, countries: BacteriaFilterItem[]) {
    state.countries = countries
  },
  setCities(state: ExperimentState, cities: BacteriaFilterItem[]) {
    state.cities = cities
  },
  setRegions(state: ExperimentState, regions: BacteriaFilterItem[]) {
    state.regions = regions
  },
  setSources(state: ExperimentState, source: BacteriaFilterItem[]) {
    state.source = source
  },
  setOrigin(state: ExperimentState, origin: BacteriaFilterItem[]) {
    state.origin = origin
  },
  setSt(state: ExperimentState, st: string[]) {
    state.st = st
  },
}
