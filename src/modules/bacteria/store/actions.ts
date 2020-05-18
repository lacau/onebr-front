import { ActionContext } from 'vuex'

import BacteriaFilter from '@/modules/shared/entities/BacteriaFilter'
import BacteriaService from '@/modules/shared/services/BacteriaService'
import MapService from '@/modules/shared/services/MapService'
import { BacteriaState } from './state'

export default {
  async fetchCoordinates({ commit }: ActionContext<BacteriaState, unknown>, bacteria: string): Promise<void> {
    try {
      const { data } = await MapService.getCoordinates(bacteria)
      commit('setCoordinates', data)
    } catch (err) {
      console.error(err)
      throw err
    }
  },
  async fetchExperiments({ commit }: ActionContext<BacteriaState, unknown>, filter: BacteriaFilter): Promise<void> {
    commit('setFilter', filter)

    try {
      const { data } = await BacteriaService.getExperimentsPaginated(filter)
      commit('setExperiments', data.content)
      commit('setPageable', data.pageable)
    } catch (err) {
      console.error(err)
      throw err
    }
  },
  async fetchExperimentById({ commit }: ActionContext<BacteriaState, unknown>, id: number): Promise<void> {
    try {
      const { data } = await BacteriaService.getExperimentById(id)
      commit('setExperiment', data)
    } catch (err) {
      console.error(err)
      throw err
    }
  },
}
