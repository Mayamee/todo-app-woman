import { Schema, Types, model } from 'mongoose'

const TokenSchema = new Schema({
  user: { type: Types.ObjectId, ref: 'User', required: true },
  refreshToken: { type: String, required: true },
})

export default model('Token', TokenSchema)
