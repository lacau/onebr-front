import Contributor from '@/modules/shared/entities/Contributor'
import Image from '@/modules/shared/entities/Image'

import { ContributorState } from './state'

export default {
  contributors(state: ContributorState): Contributor[] {
    return state.contributors
  },
  contributorImages(state: ContributorState): Image[] {
    return state.contributorImages
  },
}
