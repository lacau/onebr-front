import { ActionContext } from 'vuex'

import axios from '@/main/axios'

import BasicCredentials from '@/modules/shared/entities/BasicCredentials'

import AuthenticationService from '@/modules/shared/services/AuthenticationService'
import UserService from '@/modules/shared/services/UserService'

import { EAuthStatus, AuthState } from './state'

export default {
  async login({ commit }: ActionContext<AuthState, unknown>, credentials: BasicCredentials): Promise<void> {
    commit('setStatus', EAuthStatus.loading)

    try {
      const { data } = await AuthenticationService.login(credentials)

      commit('setToken', data.token)
      commit('setStatus', EAuthStatus.success)
      commit('setUser', data)

      localStorage.setItem('authtoken', data.token)
      localStorage.setItem('user', JSON.stringify(data))
      axios.defaults.headers.common.Authorization = `Bearer ${data.token}`
    } catch (err) {
      commit('setStatus', EAuthStatus.error)

      localStorage.removeItem('authtoken')
      localStorage.removeItem('user')
      axios.defaults.headers.common.Authorization = null
      throw err
    }
  },
  async logout({ commit }: ActionContext<AuthState, unknown>): Promise<void> {
    commit('setToken', null)

    localStorage.removeItem('authtoken')
    localStorage.removeItem('user')
    axios.defaults.headers.common.Authorization = null
  },
  async recoverPassword(_: ActionContext<AuthState, unknown>, username: string): Promise<void> {
    await UserService.recoverPassword(username)
  },
}
