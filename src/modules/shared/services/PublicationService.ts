import { AxiosResponse, AxiosTransformer } from 'axios'

import axios from '@/main/axios'
import PublicationPagination from '../entities/PublicationPagination'
import PublicationFilter from '../entities/PublicationFilter'
import PublicationModel from '../entities/form-models/Publication'

const defaultTransformResponse = axios.defaults.transformResponse as AxiosTransformer[]

abstract class PublicationService {
  static getPaginated(type: string, page: number, size: number): Promise<AxiosResponse<PublicationPagination>> {
    return axios.get('publication', {
      params: {
        type, page, size,
      },
      transformResponse: defaultTransformResponse.concat(PublicationPagination.fromResponse),
    })
  }

  static getAdminPaginated(filter: PublicationFilter): Promise<AxiosResponse<PublicationPagination>> {
    return axios.get('admin/publication', {
      params: filter.toServer(),
      transformResponse: defaultTransformResponse.concat(PublicationPagination.fromResponse),
    })
  }

  static getPublicationAdminById(id: number): Promise<AxiosResponse<PublicationModel>> {
    return axios.get(`admin/publication/${id}`, {
      transformResponse: defaultTransformResponse.concat(PublicationModel.fromResponse),
    })
  }

  static deletePublication(id: number): Promise<AxiosResponse<void>> {
    return axios.delete(`admin/publication/${id}`)
  }

  static createPublication(formModel: PublicationModel) {
    return axios.post('admin/publication', formModel.toServer())
  }

  static updatePublication(formModel: PublicationModel) {
    return axios.patch(`admin/publication/${formModel.id}`, formModel.toServer())
  }
}

export default PublicationService
