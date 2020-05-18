import BacteriaFilter from '@/modules/shared/entities/BacteriaFilter'
import Coordinate from '@/modules/shared/entities/Coordinate'
import Experiment from '@/modules/shared/entities/Experiment'
import ExperimentListItem from '@/modules/shared/entities/ExperimentListItem'
import Resistome from '@/modules/shared/entities/Resistome'

import { Pageable } from '@/modules/shared/entities/Pagination'
import { BacteriaState } from './state'

export default {
  setCoordinates(state: BacteriaState, coordinates: Coordinate[]) {
    state.coordinates = coordinates
  },
  setExperiments(state: BacteriaState, experiments: ExperimentListItem[]) {
    state.experiments = experiments
  },
  setResistome(state: BacteriaState, resistome: Resistome|null) {
    state.resistome = resistome
  },
  setExperiment(state: BacteriaState, experiment: Experiment) {
    state.experiment = experiment
  },
  setFilter(state: BacteriaState, filter: BacteriaFilter) {
    state.filter = filter
  },
  setPageable(state: BacteriaState, pageable: Pageable) {
    state.pageable = pageable
  },
  selectCoordinates(state: BacteriaState, ids: number[]) {
    /* eslint-disable no-param-reassign */
    state.coordinates.forEach((coordinate) => {
      coordinate.selected = ids.includes(coordinate.id)
    })
  },
}
