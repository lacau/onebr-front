import ExperimentListItem from '@/modules/shared/entities/ExperimentListItem'
import BacteriaFilter from '@/modules/shared/entities/BacteriaFilter'
import BacteriaFilterItem from '@/modules/shared/entities/BacteriaFilterItem'
import ExperimentModel from '@/modules/shared/entities/form-models/Experiment'
import { Pageable } from '@/modules/shared/entities/Pagination'

export interface ExperimentState {
  experiments: ExperimentListItem[];
  filter: BacteriaFilter;
  pageable?: Pageable;
  formModel: ExperimentModel|null;
  species: BacteriaFilterItem[];
  plasmidome: BacteriaFilterItem[];
  antigenH: BacteriaFilterItem[];
  antigenO: BacteriaFilterItem[];
  virulome: BacteriaFilterItem[];
  heavyMetal: BacteriaFilterItem[];
  serovar: BacteriaFilterItem[];
  clermontTyping: BacteriaFilterItem[];
  sequencer: BacteriaFilterItem[];
  source: BacteriaFilterItem[];
  origin: BacteriaFilterItem[];
  countries: BacteriaFilterItem[];
  cities: BacteriaFilterItem[];
  regions: BacteriaFilterItem[];
  st: string[];
}

const state: ExperimentState = {
  experiments: [],
  filter: BacteriaFilter.empty(),
  pageable: undefined,
  formModel: null,
  species: [],
  plasmidome: [],
  antigenH: [],
  antigenO: [],
  virulome: [],
  heavyMetal: [],
  serovar: [],
  clermontTyping: [],
  sequencer: [],
  source: [],
  origin: [],
  countries: [],
  cities: [],
  regions: [],
  st: [],
}

export default state
