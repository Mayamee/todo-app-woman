import { Types } from 'mongoose'
import ITodoBody from './ITodoBody'

export default interface ITodoPayload extends ITodoBody {
  ownerId: string
}
export interface ITodoPayloadFromDB extends ITodoBody {
  ownerId: Types.ObjectId
}
