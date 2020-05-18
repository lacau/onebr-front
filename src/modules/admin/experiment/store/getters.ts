import { ExperimentState } from './state'

function createOptions(length: number, pad: string) {
  return Array.from({ length }, (_, index) => `${pad}${index + 1}`).concat(['NA', '-'])
}

export default {
  experiments(state: ExperimentState) {
    return state.experiments
  },
  filter(state: ExperimentState) {
    return state.filter
  },
  pageable(state: ExperimentState) {
    return state.pageable
  },
  formModel(state: ExperimentState) {
    return state.formModel
  },
  species(state: ExperimentState) {
    return state.species
  },
  plasmidome(state: ExperimentState) {
    return state.plasmidome
  },
  antigenH(state: ExperimentState) {
    return state.antigenH
  },
  antigenO(state: ExperimentState) {
    return state.antigenO
  },
  virulome(state: ExperimentState) {
    return state.virulome
  },
  heavyMetal(state: ExperimentState) {
    return state.heavyMetal
  },
  serovar(state: ExperimentState) {
    return state.serovar
  },
  clermontTyping(state: ExperimentState) {
    return state.clermontTyping
  },
  sequencer(state: ExperimentState) {
    return state.sequencer
  },
  st(state: ExperimentState) {
    return state.st
  },
  source(state: ExperimentState) {
    return state.source
  },
  origin(state: ExperimentState) {
    return state.origin
  },
  countries(state: ExperimentState) {
    return state.countries
  },
  cities(state: ExperimentState) {
    return state.cities
  },
  regions(state: ExperimentState) {
    return state.regions
  },
  kLocus() {
    return createOptions(100, 'K')
  },
  wzi() {
    return createOptions(1500, 'wzi_')
  },
  wzc() {
    return createOptions(1500, 'wzc_')
  },
  fimType() {
    return createOptions(200, 'fimH')
  },
}
