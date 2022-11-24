import TodoModel from '../../models/Todo/TodoModel'
import IGetTodoSettings from '../../types/services/IGetTodoSettings'
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
  async getAllTodos(ownerId: string, settings: IGetTodoSettings) {
    if (settings.page) {
      const { limit, page } = settings
      const limitNumber = limit ? Number(limit) : 10
      const pageNumber = Number(page)
      const skip = limitNumber * (pageNumber - 1)
      const todos = await TodoModel.find({
        ownerId,
      })
        .skip(skip)
        .limit(limitNumber)
        .exec()
      return todos
    }
    const todos = await TodoModel.find({
      ownerId,
    })
    return todos
  }
	async getTodoById(ownerId: string, todoId: string) {
		const todo = await TodoModel.findOne({
			_id: todoId,
			ownerId,
		})
		return todo
	}
	async updateTodo() {}
	async deleteTodo() {}
}

export default new TodoService()
