import axios from '@/main/axios'
import UserContact from '../entities/UserContact'

abstract class MailService {
  static getInTouch(userContact: UserContact) {
    return axios.post('mail', userContact)
  }
}

export default MailService
