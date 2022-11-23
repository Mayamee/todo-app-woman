import { Schema, Types, model } from 'mongoose'
import todoElemSchema from './TodoElemSchema'

const todoSchema = new Schema({
  ownerId: { type: Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  body: [todoElemSchema],
})

export default model('Todo', todoSchema)
