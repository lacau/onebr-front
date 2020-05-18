import User from '@/modules/shared/entities/User'
import UserModel from '@/modules/shared/entities/form-models/User'
import UserFilter from '@/modules/shared/entities/UserFilter'
import BacteriaFilterItem from '@/modules/shared/entities/BacteriaFilterItem'
import { Pageable } from '@/modules/shared/entities/Pagination'

export interface UserState {
  filter: UserFilter;
  pageable?: Pageable;
  users: User[];
  formModel: UserModel|null;
  species: BacteriaFilterItem[];
}

const state: UserState = {
  filter: UserFilter.empty(),
  pageable: undefined,
  users: [],
  formModel: null,
  species: [],
}

export default state
