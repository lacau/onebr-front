import { AxiosResponse, AxiosTransformer } from 'axios'

import axios from '@/main/axios'
import User from '../entities/User'
import UserModel from '../entities/form-models/User'
import UserFilter from '../entities/UserFilter'
import UserPagination from '../entities/UserPagination'

const defaultTransformResponse = axios.defaults.transformResponse as AxiosTransformer[]

abstract class UserService {
  static getAll(): Promise<AxiosResponse<User[]>> {
    return axios.get('admin/user', {
      transformResponse: defaultTransformResponse.concat(User.fromResponse),
    })
  }

  static getUsersPaginated(filter: UserFilter): Promise<AxiosResponse<UserPagination>> {
    return axios.get('admin/user', {
      params: filter.toServer(),
      transformResponse: defaultTransformResponse.concat(UserPagination.fromResponse),
    })
  }

  static getById(id: number): Promise<AxiosResponse<UserModel>> {
    return axios.get(`admin/user/${id}`, {
      transformResponse: defaultTransformResponse.concat(UserModel.fromResponse),
    })
  }

  static activateUser(id: number): Promise<AxiosResponse<unknown>> {
    return axios.post(`admin/user/${id}/activate`)
  }

  static deactivateUser(id: number): Promise<AxiosResponse<unknown>> {
    return axios.post(`admin/user/${id}/deactivate`)
  }

  static recoverPassword(username: string): Promise<AxiosResponse<unknown>> {
    return axios.post('user/password-recover', { username })
  }

  static createUser(formModel: UserModel) {
    return axios.post('admin/user', formModel.toServer())
  }

  static updateUser(formModel: UserModel) {
    return axios.patch(`admin/user/${formModel.id}`, formModel.toServer())
  }
}

export default UserService
