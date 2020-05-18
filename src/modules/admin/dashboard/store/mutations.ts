import DashboardOption from '@/modules/shared/entities/DashboardOption'
import { DashboardState } from './state'

export default {
  setOptions(state: DashboardState, options: DashboardOption[]) {
    state.options = options
  },
}
