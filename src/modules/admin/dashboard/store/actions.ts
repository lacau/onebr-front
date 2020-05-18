import { ActionContext } from 'vuex'

import DashboardService from '@/modules/shared/services/DashboardService'

import { DashboardState } from './state'

export default {
  async fetchOptions({ commit }: ActionContext<DashboardState, unknown>): Promise<void> {
    try {
      const { data } = await DashboardService.getOptions()
      commit('setOptions', data)
    } catch (err) {
      console.error(err)
      throw err
    }
  },
}
