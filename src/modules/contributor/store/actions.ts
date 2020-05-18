import { ActionContext } from 'vuex'

import ContributorService from '@/modules/shared/services/ContributorService'
import ImageService from '@/modules/shared/services/ImageService'

import { ContributorState } from './state'

export default {
  async fetchContributors({ commit }: ActionContext<ContributorState, unknown>): Promise<void> {
    try {
      const { data } = await ContributorService.getAll()
      commit('setContributors', data)
    } catch (err) {
      console.error(err)
      throw err
    }
  },
  async fetchContributorImages({ commit }: ActionContext<ContributorState, unknown>): Promise<void> {
    try {
      const { data } = await ImageService.getContributorImages()
      commit('setContributorImages', data)
    } catch (err) {
      console.error(err)
      throw err
    }
  },
}
