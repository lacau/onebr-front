import { AxiosError } from 'axios'

import axios from '@/main/axios'
import router from '@/main/router'
import store from '@/main/store'

const token = localStorage.getItem('authtoken')
if (token) {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`
}

const logoutIfNeeded = async (err: AxiosError) => {
  const status = err.response?.status

  if (status && [401, 403].includes(status)) {
    if (router.currentRoute.name === 'login') {
      throw err
    }

    await store.dispatch('auth/logout')
    router.replace({
      name: 'login',
      query: {
        redirect: router.currentRoute.fullPath,
      },
    })
  }

  throw err
}

axios.interceptors.response.use(undefined, logoutIfNeeded)
