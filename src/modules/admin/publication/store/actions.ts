import Vue from 'vue'
import { ActionTree } from 'vuex'

import i18n from '@/plugins/i18n'

import PublicationFilter from '@/modules/shared/entities/PublicationFilter'
import PublicationModel from '@/modules/shared/entities/form-models/Publication'

import PublicationService from '@/modules/shared/services/PublicationService'
import { PublicationState } from './state'

const actions: ActionTree<PublicationState, unknown> = {
  async fetchPublications({ commit }, filter: PublicationFilter): Promise<void> {
    commit('setFilter', filter)

    try {
      const { data } = await PublicationService.getAdminPaginated(filter)
      commit('setPublications', data.content)
      commit('setPageable', data.pageable)
    } catch (err) {
      console.error(err)
      throw err
    }
  },
  async fetchPublicationById({ commit }, id: number): Promise<void> {
    try {
      const { data } = await PublicationService.getPublicationAdminById(id)
      commit('setFormModel', data)
    } catch (err) {
      console.error(err)
      throw err
    }
  },
  async removePublication({ commit, dispatch, state }, id: number): Promise<void> {
    try {
      await PublicationService.deletePublication(id)

      Vue.toasted.success(i18n.t('admin.publication.messages.deleted') as string, { icon: 'check' })

      commit('setFormModel', null)
      dispatch('fetchPublications', state.filter)
    } catch (err) {
      console.error(err)
      throw err
    }
  },
  async savePublication({ commit, dispatch, state }, formModel: PublicationModel): Promise<void> {
    const { createPublication, updatePublication } = PublicationService
    const action = formModel.id ? updatePublication : createPublication
    const message = formModel.id ? 'updated' : 'added'

    try {
      await action(formModel)

      Vue.toasted.success(i18n.t(`admin.publication.messages.${message}`) as string, { icon: 'check' })

      commit('setFormModel', null)
      dispatch('fetchPublications', state.filter)
    } catch (err) {
      console.error(err)
      throw err
    }
  },
}

export default actions
