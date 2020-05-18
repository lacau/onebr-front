import { JSON } from '@/modules/shared/utils/types'

export const enum ViewDataScope {
  contact = 'CONTACT',
  contributor = 'CONTRIBUTOR',
  footer = 'FOOTER',
  home = 'HOME',
  menu = 'MENU',
  publication = 'PUBLICATION',
  team = 'TEAM',
  restrictedDashboard = 'RESTRICTED_DASHBOARD',
  restrictedExperiment = 'RESTRICTED_EXPERIMENT',
  restrictedUser = 'RESTRICTED_USER',
  restrictedPublication = 'RESTRICTED_PUBLICATION',
}

export interface ViewDataItem {
  key: string;
  value: string;
}

class ViewData {
  constructor(
    public scope: ViewDataScope,
    public items: ViewDataItem[] = [],
    public language: string = '',
  ) { }

  static fromResponse(response: JSON): ViewData {
    return ViewData.fromJson(response)
  }

  static fromJson(json: JSON): ViewData {
    const { scope } = json
    if (!scope) {
      throw new Error('Scope cannot be undefined')
    }

    const instance = new ViewData(scope)

    if (json.items) instance.items = json.items
    if (json.language) instance.language = json.language

    return instance
  }
}

export default ViewData
