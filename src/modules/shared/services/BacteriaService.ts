import { AxiosResponse, AxiosTransformer } from 'axios'

import axios from '@/main/axios'
import BacteriaFilter from '../entities/BacteriaFilter'
import Experiment from '../entities/Experiment'
import ExperimentPagination from '../entities/ExperimentPagination'
import ExperimentModel from '../entities/form-models/Experiment'

const defaultTransformResponse = axios.defaults.transformResponse as AxiosTransformer[]

abstract class BacteriaService {
  static getExperimentsPaginated(filter: BacteriaFilter): Promise<AxiosResponse<ExperimentPagination>> {
    return axios.get('bacteria', {
      params: filter.toServer(),
      transformResponse: defaultTransformResponse.concat(ExperimentPagination.fromResponse),
    })
  }

  static getExperimentById(id: number): Promise<AxiosResponse<Experiment>> {
    return axios.get(`bacteria/${id}`, {
      transformResponse: defaultTransformResponse.concat(Experiment.fromResponse),
    })
  }

  static getExperimentsAdminPaginated(filter: BacteriaFilter): Promise<AxiosResponse<ExperimentPagination>> {
    return axios.get('admin/bacteria', {
      params: filter.toServer(),
      transformResponse: defaultTransformResponse.concat(ExperimentPagination.fromResponse),
    })
  }

  static getExperimentAdminById(id: number): Promise<AxiosResponse<ExperimentModel>> {
    return axios.get(`admin/bacteria/${id}`, {
      transformResponse: defaultTransformResponse.concat(ExperimentModel.fromResponse),
    })
  }

  static deleteExperiment(id: number): Promise<AxiosResponse<void>> {
    return axios.delete(`admin/bacteria/${id}`)
  }

  static createExperiment(formModel: ExperimentModel) {
    return axios.post('admin/bacteria', formModel.toServer())
  }

  static updateExperiment(formModel: ExperimentModel) {
    return axios.patch(`admin/bacteria/${formModel.id}`, formModel.toServer())
  }
}

export default BacteriaService
