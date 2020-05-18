import Image from '@/modules/shared/entities/Image'
import { HomeState } from './state'

export default {
  setSupportImages(state: HomeState, supportImages: Image[]) {
    state.supportImages = supportImages
  },
}
