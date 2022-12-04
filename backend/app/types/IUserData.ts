import { Types } from 'mongoose'

export default interface IUserData {
  login: string
  password: string
}
export interface IUserDataWithId extends IUserData {
  _id: Types.ObjectId
}
