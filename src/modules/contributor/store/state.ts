import Contributor from '@/modules/shared/entities/Contributor'
import Image from '@/modules/shared/entities/Image'

export interface ContributorState {
  contributors: Contributor[];
  contributorImages: Image[];
}

const state: ContributorState = {
  contributors: [],
  contributorImages: [],
}

export default state
