import { Types } from 'mongoose'

export const getUserDto = (login: string, id: Types.ObjectId) => ({
  login,
  id,
})
