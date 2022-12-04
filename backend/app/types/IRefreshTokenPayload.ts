import { Types } from 'mongoose'

export default interface IRefreshTokenPayload {
  _id: Types.ObjectId
  user: Types.ObjectId
  refreshToken: string
}
