import Image from '@/modules/shared/entities/Image'
import { HomeState } from './state'

export default {
  supportImages(state: HomeState): Image[] {
    return state.supportImages
  },
}
