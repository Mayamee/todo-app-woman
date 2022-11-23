import { Request } from 'express'

export default interface ICookieRequest extends Request {
  cookies: {
    refreshToken: string
  }
}
