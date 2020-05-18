import { ActionContext } from 'vuex'

import PublicationService from '@/modules/shared/services/PublicationService'
import { PublicationState } from './state'

export default {
  async fetchPublications({ commit }: ActionContext<PublicationState, unknown>, { contentType = '', page = 0 }): Promise<void> {
    try {
      const { data } = await PublicationService.getPaginated(contentType, page, 4)

      commit('setPublications', data.content)
      commit('setPageable', data.pageable)
    } catch (err) {
      console.error(err)
      throw err
    }
  },
}
