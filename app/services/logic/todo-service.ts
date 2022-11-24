import TodoModel from '../../models/Todo/TodoModel'
import IGetTodoSettings from '../../types/services/IGetTodoSettings'
import ITodoPayload from '../../types/services/ITodoPayload'

/**
 * @description Service for working with todo
 * @class TodoService
 * @method createTodo
 * @description create todo
 * @param {ITodoPayload} payload - payload for todo
 * @returns {Promise<ITodoPayload>} created todo
 * @example
 * TodoService.createTodo({
 * title: 'test',
 * description: 'test',
 * todoBody: 'test',
 * ownerID: 'someObjectId',
 * }).then((todo) => {
 * console.log(todo)
 * })
 * getAllTodos
 * @description get all todos
 * @param ownerId - owner id
 * @param {IGetTodoSettings} settings - settings for getting todos
 * @returns {Promise<ITodoPayload[] | []>} todos
 * @example
 * TodoService.getAllTodos('someObjectId', {
 * limit: 10,
 * page: 1,
 * }).then((todos) => {
 * console.log(todos)
 * })
 * @method getTodoById
 * @description get todo by id
 * @param {string} ownerId - owner id
 * @param {string} id - todo id
 * @returns {Promise<ITodoPayload | null>} todo
 * @example
 * TodoService.getTodoById('someObjectId', 'someObjectId').then((todo) => {
 * console.log(todo)
 * })
 * @method updateTodo
 * @description update todo
 * @param {string} ownerId - owner id
 * @param {string} id - todo id
 * @param {ITodoPayload} payload - payload for todo
 * @returns {Promise<UpdateResult>} updated todo
 * @example
 * TodoService.updateTodo('someObjectId', 'someObjectId', {
 * title: 'test',
 * description: 'test',
 * todoBody: 'test',
 * ownerID: 'someObjectId',
 * }).then((result) => {
 * console.log(result)
 * })
 * @method deleteTodo
 * @description delete todo
 * @param {string} ownerId - owner id
 * @param {string} id - todo id
 * @returns {Promise<DeleteResult>} deleted todo
 * @example
 * TodoService.deleteTodo('someObjectId', 'someObjectId').then((result) => {
 * console.log(result)
 * })
 */
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
  async updateTodo(ownerId: string, todoId: string, payload: ITodoPayload) {
    const { title, description, todoBody } = payload
    const todo = await TodoModel.updateOne(
      {
        _id: todoId,
        ownerId,
      },
      {
        title,
        description,
        todoBody,
      },
      { upsert: false }
    )
    return todo
  }
  async deleteTodo(ownerId: string, todoId: string) {
    const todo = await TodoModel.deleteOne({
      _id: todoId,
      ownerId,
    })
    return todo
  }
}

export default new TodoService()
