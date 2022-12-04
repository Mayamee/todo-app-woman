import { NextFunction, Response } from 'express'
import todoService from '../services/logic/todo-service'
import ITodoPayloadRequest, { ITodoPayloadAndIdRequest } from '../types/ITodoPayloadRequest'
import IUserPayload from '../types/IUserPayload'
import ITodoPayload from '../types/ITodoPayload'
import IGetAllTodoRequest from '../types/IGetAllTodoRequest'
import IIdParamsRequest from '../types/IIdParamsRequest'

/**
 * Todo controller that contains all the methods for todo
 */
class TodoController {
  /**
   * Method for creating todo that takes payload from
   * request body and user id from request user
   * and passes it to todo service
   * @param {ITodoPayloadRequest} req - request with todo payload
   * @param {Response} res - response with created todo
   * @param {NextFunction} next - next function
   * @return {Promise<void>} void promise
   */
  async createTodo(req: ITodoPayloadRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id: userId } = req.user as IUserPayload
      const {
        body: { title, description, todoBody },
      } = req
      const payload: ITodoPayload = {
        title,
        description,
        todoBody,
        ownerId: userId,
      }
      const todoInfo = await todoService.createTodo(payload)
      res.status(200).json(todoInfo)
    } catch (err) {
      next(err)
    }
  }
  /**
   * Method for getting all todos that takes user id from
   * request user and passes it to todo service
   * @param {IGetAllTodoRequest} req - request with user payload and query for pagination
   * @param {Response} res - response with array of todos
   * @param {NextFunction} next - next function
   * @return {Promise<void>} void promise
   */
  async getAllTodos(req: IGetAllTodoRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { limit, page } = req.query
      const settings = {
        limit,
        page,
      }
      const { id: userId } = req.user as IUserPayload
      const todos = await todoService.getAllTodos(userId, settings)
      res.status(200).json(todos)
    } catch (err) {
      next(err)
    }
  }
  /**
   * Method for getting todo by id that takes user id from
   * request user and passes it to todo service
   * @param {IIdParamsRequest} req - request with todo id
   * @param {Response} res - response with todo
   * @param {NextFunction} next - next function
   * @return {Promise<void>} void promise
   */
  async getTodoById(req: IIdParamsRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id: userId } = req.user as IUserPayload
      const { id: todoId } = req.params
      const todo = await todoService.getTodoById(userId, todoId)
      res.status(200).json(todo)
    } catch (err) {
      next(err)
    }
  }
  /**
   * Method for updating todo that takes payload from
   * request body and user id from request user
   * and passes it to todo service
   * @param {ITodoPayloadAndIdRequest} req - request with todo payload and todo id
   * @param {Response} res - response with update result
   * @param {NextFunction} next - next function
   * @return {Promise<void>} void promise
   */
  async updateTodo(
    req: ITodoPayloadAndIdRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id: userId } = req.user as IUserPayload
      const { id: todoId } = req.params
      const {
        body: { title, description, todoBody },
      } = req
      const payload: ITodoPayload = {
        title,
        description,
        todoBody,
        ownerId: userId,
      }
      const todo = await todoService.updateTodo(userId, todoId, payload)
      res.status(200).json(todo)
    } catch (err) {
      next(err)
    }
  }
  /**
   * Method for deleting todo that takes user id from
   * request user and passes it to todo service
   * @param {IIdParamsRequest} req - request with todo id
   * @param {Response} res - response with delete result
   * @param {NextFunction} next - next function
   * @return {Promise<void>} void promise
   */
  async deleteTodo(req: IIdParamsRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id: userId } = req.user as IUserPayload
      const { id: todoId } = req.params
      const todo = await todoService.deleteTodo(userId, todoId)
      res.status(200).json(todo)
    } catch (err) {
      next(err)
    }
  }
}

export default new TodoController()
