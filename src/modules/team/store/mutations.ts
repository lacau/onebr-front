import TeamMember from '@/modules/shared/entities/TeamMember'
import { TeamState } from './state'

export default {
  setMembers(state: TeamState, members: TeamMember[]) {
    state.members = members
  },
}
