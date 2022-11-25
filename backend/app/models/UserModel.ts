import { Schema, model } from 'mongoose'

const UserSchema = new Schema({
  login: { type: String, required: true, unique: true },
  password: { type: String, required: true },
})

export default model('User', UserSchema)
