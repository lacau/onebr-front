import { AxiosResponse, AxiosTransformer } from 'axios'

import axios from '@/main/axios'
import ViewData, { ViewDataScope } from '../entities/ViewData'

const defaultTransformResponse = axios.defaults.transformResponse as AxiosTransformer[]

abstract class ViewDataService {
  static getViewData(scope: ViewDataScope): Promise<AxiosResponse<ViewData>> {
    return axios.get('view-data', {
      params: { scope },
      transformResponse: defaultTransformResponse.concat(ViewData.fromResponse),
    })
  }
}

export default ViewDataService
