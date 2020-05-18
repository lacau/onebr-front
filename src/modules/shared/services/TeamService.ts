import { AxiosResponse, AxiosTransformer } from 'axios'

import axios from '@/main/axios'
import TeamMember from '../entities/TeamMember'

const defaultTransformResponse = axios.defaults.transformResponse as AxiosTransformer[]

abstract class TeamService {
  static getAll(): Promise<AxiosResponse<TeamMember[]>> {
    return axios.get('team', {
      transformResponse: defaultTransformResponse.concat(TeamMember.fromResponse),
    })
  }
}

export default TeamService
