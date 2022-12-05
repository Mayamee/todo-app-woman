import { Document, Types, UpdateWriteOpResult } from 'mongoose'
import TodoModel from '../../models/Todo/TodoModel'
import IDeleteResult from '../../types/IDeleteResult'
import IGetTodoSettings from '../../types/IGetTodoSettings'
import ITodoPayload, { ITodoPayloadFromDB } from '../../types/ITodoPayload'

/**
 * Todo Service that contains all the methods for
 * database interaction with todo model
 */
class TodoService {
  /**
   * Creates a new todo in the database and returns the created todo
   * @param {ITodoPayload} payload - payload for todo
   * @return {Promise<Document<Types.ObjectId, unknown, ITodoPayloadFromDB>>} created todo
   * @example
   * TodoService.createTodo({
   * title: 'test',
   * description: 'test',
   * todoBody: 'test',
   * ownerID: 'someObjectId',
   * }).then((todo) => {
   * console.log(todo)
   * })
   */
  async createTodo(
    payload: ITodoPayload
  ): Promise<Document<Types.ObjectId, unknown, ITodoPayloadFromDB>> {
    const { title, description, todoBody, ownerId } = payload
    const todo = await TodoModel.create({
      title,
      description,
      todoBody,
      ownerId,
    })
    return await todo.save()
  }
  /**
   * Get all todos from the database and returns the todos
   * @param {string} ownerId - owner id of the todo
   * @param {IGetTodoSettings} settings - settings for getting todos
   * @return {Promise<Document<Types.ObjectId, unknown, ITodoPayloadFromDB>[]>} todos
   * @example
   * TodoService.getAllTodos('someObjectId', {
   * limit: 10,
   * page: 1,
   * }).then((todos) => {
   * console.log(todos)
   * })
   */
  async getAllTodos(
    ownerId: string,
    settings: IGetTodoSettings
  ): Promise<Document<Types.ObjectId, unknown, ITodoPayloadFromDB>[]> {
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
  /**
   * Get todo by id from the database and returns the todo if it exists
   * if todo doesn't exist returns null
   * @param {string} ownerId - owner id
   * @param {string} todoId - todo id
   * @return {Promise<Document<Types.ObjectId, unknown, ITodoPayloadFromDB> | null>} todo
   * @example
   * TodoService.getTodoById('someObjectId', 'someObjectId').then((todo) => {
   * console.log(todo)
   * })
   */
  async getTodoById(
    ownerId: string,
    todoId: string
  ): Promise<Document<Types.ObjectId, unknown, ITodoPayloadFromDB> | null> {
    const todo = await TodoModel.findOne({
      _id: todoId,
      ownerId,
    })
    return todo
  }
  /**
   * Updates a todo in the database and returns the updated todo
   * @param {string} ownerId - owner id of the todo
   * @param {string} todoId - todo id of the todo
   * @param {ITodoPayload} payload - payload for todo update
   * @return {Promise<UpdateWriteOpResult>} todo update result
   */
  async updateTodo(
    ownerId: string,
    todoId: string,
    payload: ITodoPayload
  ): Promise<UpdateWriteOpResult> {
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
  /**
   * Deletes a todo in the database and returns delete result
   * @param {string} ownerId - owner id of the todo
   * @param {string} todoId - todo id of the todo
   * @return {Promise<DeleteResult>} deleted todo
   */
  async deleteTodo(ownerId: string, todoId: string): Promise<IDeleteResult> {
    const todo = await TodoModel.deleteOne({
      _id: todoId,
      ownerId,
    })
    return todo
  }
}

export default new TodoService()
