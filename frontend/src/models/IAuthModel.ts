export interface IAuthModel {
  isAuthenticated: boolean
  login: string | null
  id: string | null
  accessToken: string | null
  refreshToken: string | null
}
