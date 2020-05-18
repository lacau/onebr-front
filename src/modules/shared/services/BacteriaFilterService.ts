import { AxiosResponse, AxiosTransformer } from 'axios'

import axios from '@/main/axios'
import BacteriaFilterItem from '../entities/BacteriaFilterItem'

const defaultTransformResponse = axios.defaults.transformResponse as AxiosTransformer[]

abstract class BacteriaFilterService {
  static getAntigenH(): Promise<AxiosResponse<BacteriaFilterItem[]>> {
    return axios.get('bacteria/filter/antigenH', {
      transformResponse: defaultTransformResponse.concat(BacteriaFilterItem.fromResponse),
    })
  }

  static getAntigenO(): Promise<AxiosResponse<BacteriaFilterItem[]>> {
    return axios.get('bacteria/filter/antigenO', {
      transformResponse: defaultTransformResponse.concat(BacteriaFilterItem.fromResponse),
    })
  }

  static getClermontTyping(): Promise<AxiosResponse<BacteriaFilterItem[]>> {
    return axios.get('bacteria/filter/clermontTyping', {
      transformResponse: defaultTransformResponse.concat(BacteriaFilterItem.fromResponse),
    })
  }

  static getFimType(): Promise<AxiosResponse<string[]>> {
    return axios.get('bacteria/filter/fimType')
  }

  static getKLocus(): Promise<AxiosResponse<string[]>> {
    return axios.get('bacteria/filter/kLocus')
  }

  static getOrigin(): Promise<AxiosResponse<BacteriaFilterItem[]>> {
    return axios.get('bacteria/filter/origin', {
      transformResponse: defaultTransformResponse.concat(BacteriaFilterItem.fromResponse),
    })
  }

  static getPlasmidome(): Promise<AxiosResponse<BacteriaFilterItem[]>> {
    return axios.get('bacteria/filter/plasmidome', {
      transformResponse: defaultTransformResponse.concat(BacteriaFilterItem.fromResponse),
    })
  }

  static getResistomes(searchTerm: string, type?: string): Promise<AxiosResponse<unknown[]>> {
    return axios.get('bacteria/filter/resistome', {
      params: { searchTerm, type },
      transformResponse: defaultTransformResponse,
    })
  }

  static getSerovar(): Promise<AxiosResponse<BacteriaFilterItem[]>> {
    return axios.get('bacteria/filter/serovar', {
      transformResponse: defaultTransformResponse.concat(BacteriaFilterItem.fromResponse),
    })
  }

  static getSources(): Promise<AxiosResponse<BacteriaFilterItem[]>> {
    return axios.get('bacteria/filter/source', {
      transformResponse: defaultTransformResponse.concat(BacteriaFilterItem.fromResponse),
    })
  }

  static getSpecies(): Promise<AxiosResponse<BacteriaFilterItem[]>> {
    /**
     * TODO: find a better way to solve this guy, this endpoint always returns 404 for
     * users that don't have species associated and is called when user try edit his profile
     */
    return axios.get('bacteria/filter/specie', {
      transformResponse: defaultTransformResponse.concat([
        (data) => ((data.status === 404) ? [] : data),
        BacteriaFilterItem.fromResponse,
      ]),
      validateStatus: (status) => (status >= 200 && status < 300) || status === 404,
    })
  }

  static getSts(): Promise<AxiosResponse<string[]>> {
    return axios.get('bacteria/filter/st')
  }

  static getVirulome(): Promise<AxiosResponse<BacteriaFilterItem[]>> {
    return axios.get('bacteria/filter/virulome', {
      transformResponse: defaultTransformResponse.concat(BacteriaFilterItem.fromResponse),
    })
  }

  static getWzc(): Promise<AxiosResponse<string[]>> {
    return axios.get('bacteria/filter/wzc')
  }

  static getWzi(): Promise<AxiosResponse<string[]>> {
    return axios.get('bacteria/filter/wzi')
  }

  static getHeavyMetal(): Promise<AxiosResponse<BacteriaFilterItem[]>> {
    return axios.get('bacteria/filter/heavyMetal', {
      transformResponse: defaultTransformResponse.concat(BacteriaFilterItem.fromResponse),
    })
  }

  static getSequencer(): Promise<AxiosResponse<BacteriaFilterItem[]>> {
    return axios.get('bacteria/filter/sequencer', {
      transformResponse: defaultTransformResponse.concat(BacteriaFilterItem.fromResponse),
    })
  }
}

export default BacteriaFilterService
