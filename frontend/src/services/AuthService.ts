import { AxiosResponse } from 'axios'
import { API } from '../http'
import { IAuthData } from '../models/IAuthData'
import { IAuthModel } from '../models/IAuthModel'
import { IDeleteResult } from '../models/IDeleteResult'

class AuthService {
  static login(authData: IAuthData): Promise<AxiosResponse<IAuthModel>> {
    return API.post<IAuthModel>('/auth/login', authData)
  }
  static register(authData: IAuthData): Promise<AxiosResponse<IAuthModel>> {
    return API.post<IAuthModel>('/auth/register', authData)
  }
  static logout(): Promise<AxiosResponse<IDeleteResult>> {
    return API.get<IDeleteResult>('/auth/logout')
  }
  static refreshToken(): Promise<AxiosResponse<IAuthModel>> {
    return API.get<IAuthModel>('/auth/refresh')
  }
}
export default AuthService
