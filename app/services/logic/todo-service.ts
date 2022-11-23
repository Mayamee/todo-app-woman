import TodoModel from '../../models/Todo/TodoModel'
import ITodoPayload from '../../types/services/ITodoPayload'

class TodoService {
  async createTodo(payload: ITodoPayload) {
    const { title, description, todoBody, ownerId } = payload
    const todo = await TodoModel.create({
      title,
      description,
      todoBody,
      ownerId,
    })
    return await todo.save()
  }
}

export default new TodoService()
