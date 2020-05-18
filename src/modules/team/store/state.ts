import TeamMember from '@/modules/shared/entities/TeamMember'

export interface TeamState {
  members: TeamMember[];
}

const state: TeamState = {
  members: [],
}

export default state
