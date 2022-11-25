import { Request } from 'express'
import IUserPayload from './IUserPayload'

export default interface IAuthRequest extends Request {
  headers: {
    authorization?: string
  }
  user?: IUserPayload
}
