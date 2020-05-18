import { AxiosResponse, AxiosTransformer } from 'axios'

import axios from '@/main/axios'
import Image from '../entities/Image'

const defaultTransformResponse = axios.defaults.transformResponse as AxiosTransformer[]

abstract class ImageService {
  static getSupportImages(): Promise<AxiosResponse<Image[]>> {
    return axios.get('image/support', {
      transformResponse: defaultTransformResponse.concat(Image.fromResponse),
    })
  }

  static getContributorImages(): Promise<AxiosResponse<Image[]>> {
    return axios.get('image/contributor', {
      transformResponse: defaultTransformResponse.concat(Image.fromResponse),
    })
  }
}

export default ImageService
