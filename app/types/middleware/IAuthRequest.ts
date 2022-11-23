import { Request } from 'express'
import IUserPayload from '../services/IUserPayload'

export default interface IAuthRequest extends Request {
  headers: {
    authorization?: string
  }
  user: IUserPayload
}
