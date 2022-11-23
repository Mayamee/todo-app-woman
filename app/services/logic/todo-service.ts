import TodoModel from '../../models/Todo/TodoModel'
import ITodoPayload from '../../types/services/ITodoPayload'

class TodoService {
  async createTodo(payload: ITodoPayload) {
    const { title, description, todoBody, ownerId } = payload
  }
}

export default new TodoService()
