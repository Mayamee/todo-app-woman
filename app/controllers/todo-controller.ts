import { NextFunction, Response } from 'express'
import todoService from '../services/logic/todo-service'
import ITodoPayloadRequest, {
  ITodoPayloadAndIdRequest,
} from '../types/controllers/ITodoPayloadRequest'
import IUserPayload from '../types/services/IUserPayload'
import ITodoPayload from '../types/services/ITodoPayload'
import IGetAllTodoRequest from '../types/middleware/IGetAllTodoRequest'
import IIdParamsRequest from '../types/controllers/IIdParamsRequest'

/**
 * @description Todo controller
 * @class TodoController
 * @method createTodo - create todo
 * @param {ITodoPayloadRequest} req - request with todo payload
 * @param {Response} res - response with created todo
 * @param {NextFunction} next - next function
 * @returns {Promise<void>}
 * @method getAllTodos - get all todos
 * @param {IGetAllTodoRequest} req - request with user payload and query for pagination
 * @param {Response} res - response with array of todos
 * @param {NextFunction} next - next function
 * @returns {Promise<void>}
 * @method getTodoById - get todo by id
 * @param {IIdParamsRequest} req - request with todo id
 * @param {Response} res - response with todo
 * @param {NextFunction} next - next function
 * @returns {Promise<void>}
 * @method updateTodo - update todo
 * @param {ITodoPayloadAndIdRequest} req - request with todo payload and todo id
 * @param {Response} res - response with update result
 * @param {NextFunction} next - next function
 * @returns {Promise<void>}
 * @method deleteTodo - delete todo
 * @param {IIdParamsRequest} req - request with todo id
 * @param {Response} res - response with delete result
 * @param {NextFunction} next - next function
 * @returns {Promise<void>}
 */
class TodoController {
  async createTodo(req: ITodoPayloadRequest, res: Response, next: NextFunction) {
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
      return res.status(200).json(todoInfo)
    } catch (err) {
      next(err)
    }
  }
  async getAllTodos(req: IGetAllTodoRequest, res: Response, next: NextFunction) {
    try {
      const { limit, page } = req.query
      const settings = {
        limit,
        page,
      }
      const { id: userId } = req.user as IUserPayload
      const todos = await todoService.getAllTodos(userId, settings)
      return res.status(200).json(todos)
    } catch (err) {
      next(err)
    }
  }
  async getTodoById(req: IIdParamsRequest, res: Response, next: NextFunction) {
    try {
      const { id: userId } = req.user as IUserPayload
      const { id: todoId } = req.params
      const todo = await todoService.getTodoById(userId, todoId)
      return res.status(200).json(todo)
    } catch (err) {
      next(err)
    }
  }
  async updateTodo(req: ITodoPayloadAndIdRequest, res: Response, next: NextFunction) {
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
      return res.status(200).json(todo)
    } catch (err) {
      next(err)
    }
  }
  async deleteTodo(req: IIdParamsRequest, res: Response, next: NextFunction) {
    try {
      const { id: userId } = req.user as IUserPayload
      const { id: todoId } = req.params
      const todo = await todoService.deleteTodo(userId, todoId)
      return res.status(200).json(todo)
    } catch (err) {
      next(err)
    }
  }
}

export default new TodoController()
