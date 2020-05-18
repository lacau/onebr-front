import { JSON } from '@/modules/shared/utils/types'

import ProfileImage from './ProfileImage'

export const enum TeamMemberTitle {
  instructor = 'INSTRUCTOR',
  postDocStudent = 'POST_DOC_STUDENT',
  docStudent = 'DOC_STUDENT',
  mastering = 'MASTERING'
}

class TeamMember {
  constructor(
    public image?: ProfileImage,
    public title?: TeamMemberTitle,
    public curriculumLink: string = '',
    public description: string = '',
    public name: string = '',
    public order: number = 0,
  ) { }

  static fromResponse(response: JSON): TeamMember | TeamMember[] {
    if (Array.isArray(response.team)) {
      return response.team.map(TeamMember.fromJson)
    }

    return TeamMember.fromJson(response)
  }

  static fromJson(json: JSON): TeamMember {
    const instance = new TeamMember()

    if (json.curriculum_link) instance.curriculumLink = json.curriculum_link
    if (json.description) instance.description = json.description
    if (json.image) instance.image = ProfileImage.fromJson(json.image)
    if (json.name) instance.name = json.name
    if (json.order) instance.order = json.order
    if (json.title) instance.title = json.title

    return instance
  }
}

export default TeamMember
