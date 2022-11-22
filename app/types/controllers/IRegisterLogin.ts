import { Request } from 'express'

export interface IRegisterLoginRequest extends Request {
  body: {
    login: string
    password: string
  }
}
