import { AxiosResponse, AxiosTransformer } from 'axios'

import axios from '@/main/axios'
import BacteriaFilterItem from '../entities/BacteriaFilterItem'

const defaultTransformResponse = axios.defaults.transformResponse as AxiosTransformer[]

abstract class RegionService {
  static getCountries(): Promise<AxiosResponse<BacteriaFilterItem[]>> {
    return axios.get('admin/country', {
      transformResponse: defaultTransformResponse.concat(BacteriaFilterItem.fromResponse),
    })
  }

  static getCities(countryId: number, name: string): Promise<AxiosResponse<BacteriaFilterItem[]>> {
    return axios.get('admin/city', {
      params: { countryId, name },
      transformResponse: defaultTransformResponse.concat(BacteriaFilterItem.fromResponse),
    })
  }

  static getRegions(): Promise<AxiosResponse<BacteriaFilterItem[]>> {
    return axios.get('admin/region', {
      transformResponse: defaultTransformResponse.concat(BacteriaFilterItem.fromResponse),
    })
  }
}

export default RegionService
