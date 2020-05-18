import { filter } from 'lodash'

import TeamMember, { TeamMemberTitle } from '@/modules/shared/entities/TeamMember'
import { TeamState } from './state'

export default {
  instructor(state: TeamState): TeamMember[] {
    return filter(state.members, ['title', TeamMemberTitle.instructor])
  },
  postDocStudents(state: TeamState): TeamMember[] {
    return filter(state.members, ['title', TeamMemberTitle.postDocStudent])
  },
  docStudents(state: TeamState): TeamMember[] {
    return filter(state.members, ['title', TeamMemberTitle.docStudent])
  },
  mastering(state: TeamState): TeamMember[] {
    return filter(state.members, ['title', TeamMemberTitle.mastering])
  },
}
