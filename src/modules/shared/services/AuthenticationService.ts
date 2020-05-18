import axios from '@/main/axios'
import BasicCredentials from '../entities/BasicCredentials'

abstract class AuthenticationService {
  static login(credentials: BasicCredentials) {
    return axios.post('login', credentials)
  }
}

export default AuthenticationService
