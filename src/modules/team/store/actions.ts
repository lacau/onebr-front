import { ActionContext } from 'vuex'

import TeamService from '@/modules/shared/services/TeamService'
import { TeamState } from './state'

export default {
  async fetchTeam({ commit }: ActionContext<TeamState, unknown>): Promise<void> {
    try {
      const { data } = await TeamService.getAll()
      commit('setMembers', data)
    } catch (err) {
      console.error(err)
      throw err
    }
  },
}
