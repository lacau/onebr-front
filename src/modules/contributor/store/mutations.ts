import Contributor from '@/modules/shared/entities/Contributor'
import Image from '@/modules/shared/entities/Image'

import { ContributorState } from './state'

export default {
  setContributors(state: ContributorState, contributors: Contributor[]) {
    state.contributors = contributors
  },
  setContributorImages(state: ContributorState, contributorImages: Image[]) {
    state.contributorImages = contributorImages
  },
}
