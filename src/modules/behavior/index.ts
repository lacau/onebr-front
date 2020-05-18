import Vue from 'vue'
import { AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios'

import axios from '@/main/axios'
import store from '@/main/store'
import i18n from '@/plugins/i18n'

const enable = (config: AxiosRequestConfig) => {
  store.commit('behavior/enableLoading')

  return config
}

const disable = (response: AxiosResponse) => {
  store.commit('behavior/disableLoading')

  return response
}

const disableWhenError = (err: AxiosError) => {
  store.commit('behavior/disableLoading')

  return Promise.reject(err)
}

axios.interceptors.request.use(enable)
axios.interceptors.response.use(disable, disableWhenError)

const notifyError = (err: AxiosError) => {
  const message = err.response?.data.message ?? i18n.t('shared.default_server_error')

  Vue.toasted.error(message, { icon: 'warning' })

  return Promise.reject(err)
}

axios.interceptors.response.use(undefined, notifyError)
