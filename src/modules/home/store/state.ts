import Image from '@/modules/shared/entities/Image'

export interface HomeState {
  supportImages: Image[];
}

const state: HomeState = {
  supportImages: [],
}

export default state
