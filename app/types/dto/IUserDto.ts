import { Types } from 'mongoose'

export default interface IUserDto {
  id: Types.ObjectId
  login: string
}
