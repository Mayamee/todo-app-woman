import { Schema } from 'mongoose'

const todoElemSchema = new Schema({
  id: { type: Number, required: true },
  isDone: { type: Boolean, required: true },
  text: { type: String, required: true },
})

export default todoElemSchema
