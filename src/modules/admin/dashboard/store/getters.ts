import DashboardOption from '@/modules/shared/entities/DashboardOption'
import { DashboardState } from './state'

export default {
  options(state: DashboardState): DashboardOption[] {
    return state.options
  },
}
