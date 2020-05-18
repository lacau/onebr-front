import { ActionContext } from 'vuex'

import ImageService from '@/modules/shared/services/ImageService'
import { HomeState } from './state'

export default {
  async fetchSupportImages({ commit }: ActionContext<HomeState, unknown>): Promise<void> {
    try {
      const { data } = await ImageService.getSupportImages()
      commit('setSupportImages', data)
    } catch (err) {
      console.error(err)
      throw err
    }
  },
}
