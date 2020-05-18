import Vue from 'vue'
import { ActionTree } from 'vuex'

import i18n from '@/plugins/i18n'

import UserFilter from '@/modules/shared/entities/UserFilter'
import UserModel from '@/modules/shared/entities/form-models/User'

import UserService from '@/modules/shared/services/UserService'
import BacteriaFilterService from '@/modules/shared/services/BacteriaFilterService'

import { UserState } from './state'

const actions: ActionTree<UserState, unknown> = {
  async fetchUsers({ commit }, filter: UserFilter): Promise<void> {
    commit('setFilter', filter)

    try {
      const { data } = await UserService.getUsersPaginated(filter)
      commit('setUsers', data.content)
      commit('setPageable', data.pageable)
    } catch (err) {
      console.error(err)
      throw err
    }
  },
  async fetchUserById({ commit }, id: number): Promise<void> {
    try {
      const { data } = await UserService.getById(id)
      commit('setFormModel', data)
    } catch (err) {
      console.error(err)
      throw err
    }
  },
  async saveUser({ commit, dispatch, state }, formModel: UserModel): Promise<void> {
    const { createUser, updateUser } = UserService
    const action = formModel.id ? updateUser : createUser
    const message = formModel.id ? 'updated' : 'added'

    try {
      await action(formModel)

      Vue.toasted.success(i18n.t(`admin.user.messages.${message}`) as string, { icon: 'check' })

      commit('setFormModel', null)
      dispatch('fetchUsers', state.filter)
    } catch (err) {
      console.error(err)
      throw err
    }
  },
  async fetchSpecies({ commit }): Promise<void> {
    const { data } = await BacteriaFilterService.getSpecies()
    commit('setSpecies', data)
  },
}

export default actions
