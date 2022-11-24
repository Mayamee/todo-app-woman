import { NextFunction, Response } from 'express'
import todoService from '../services/logic/todo-service'
import IAuthRequest from '../types/middleware/IAuthRequest'
import ICreateTodoRequest from '../types/controllers/ICreateTodoRequest'
import IUserPayload from '../types/services/IUserPayload'
import ITodoPayload from '../types/services/ITodoPayload'
import IGetAllTodoRequest from '../types/middleware/IGetAllTodoRequest'
import IIdParams from '../types/controllers/IIdParams'

class TodoController {
  async createTodo(req: ICreateTodoRequest, res: Response, next: NextFunction) {
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
  async getTodoById(req: IIdParams, res: Response, next: NextFunction) {
    try {
      const { id: userId } = req.user as IUserPayload
      const { id: todoId } = req.params
    } catch (err) {
      next(err)
    }
  }
  async updateTodo(req: IAuthRequest, res: Response, next: NextFunction) {
    try {
    } catch (err) {
      next(err)
    }
  }
  async deleteTodo(req: IAuthRequest, res: Response, next: NextFunction) {
    try {
    } catch (err) {
      next(err)
    }
  }
}

export default new TodoController()
