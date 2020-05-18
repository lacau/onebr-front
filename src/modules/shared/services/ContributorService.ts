import { AxiosResponse, AxiosTransformer } from 'axios'

import axios from '@/main/axios'
import Contributor from '../entities/Contributor'

const defaultTransformResponse = axios.defaults.transformResponse as AxiosTransformer[]

abstract class ContributorService {
  static getAll(): Promise<AxiosResponse<Contributor[]>> {
    return axios.get('contributor', {
      transformResponse: defaultTransformResponse.concat(Contributor.fromResponse),
    })
  }
}

export default ContributorService
