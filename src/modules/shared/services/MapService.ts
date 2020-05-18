import { AxiosResponse, AxiosTransformer } from 'axios'

import axios from '@/main/axios'
import Coordinate from '../entities/Coordinate'

const defaultTransformResponse = axios.defaults.transformResponse as AxiosTransformer[]

abstract class MapService {
  static getCoordinates(bacteria: string): Promise<AxiosResponse<Coordinate[]>> {
    return axios.get('map/coordinates', {
      params: {
        bacteria,
      },
      transformResponse: defaultTransformResponse.concat(Coordinate.fromResponse),
    })
  }
}

export default MapService
