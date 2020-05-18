import Vue from 'vue'
import { ActionTree } from 'vuex'

import i18n from '@/plugins/i18n'

import BacteriaFilterService from '@/modules/shared/services/BacteriaFilterService'
import UserService from '@/modules/shared/services/UserService'

import UserModel from '../entities/form-models/User'

import { SharedState } from './state'

const actions: ActionTree<SharedState, unknown> = {
  async fetchSpecies({ commit }): Promise<void> {
    const { data } = await BacteriaFilterService.getSpecies()
    commit('setSpecies', data)
  },
  async fetchUserById(_, id: number): Promise<UserModel> {
    try {
      const { data } = await UserService.getById(id)
      return data
    } catch (err) {
      console.error(err)
      throw err
    }
  },
  async updateUser(_, formModel: UserModel): Promise<void> {
    try {
      await UserService.updateUser(formModel)

      Vue.toasted.success(i18n.t('shared.messages.profile_updated') as string, { icon: 'check' })
    } catch (err) {
      console.error(err)
      throw err
    }
  },
}

export default actions
