import * as types from '@/modules/shared/utils/types'

export const enum EAuthStatus {
  loading, success, error
}

export interface AuthState {
  token: string | null;
  status: EAuthStatus | null;
  user: types.JSON | null;
}

const state: AuthState = {
  token: localStorage.getItem('authtoken'),
  user: JSON.parse(localStorage.getItem('user') as string),
  status: null,
}

export default state
