import { AxiosResponse, AxiosTransformer } from 'axios'

import axios from '@/main/axios'
import DashboardOption from '../entities/DashboardOption'

const defaultTransformResponse = axios.defaults.transformResponse as AxiosTransformer[]

abstract class DashboardService {
  static getOptions(): Promise<AxiosResponse<DashboardOption>> {
    return axios.get('dashboard/options', {
      transformResponse: defaultTransformResponse.concat(DashboardOption.fromResponse),
    })
  }
}

export default DashboardService
