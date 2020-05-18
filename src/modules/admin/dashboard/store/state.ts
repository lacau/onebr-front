import DashboardOption from '@/modules/shared/entities/DashboardOption'

export interface DashboardState {
  options: DashboardOption[];
}

const state: DashboardState = {
  options: [],
}

export default state
