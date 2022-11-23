import { NextFunction, Response } from 'express'
import todoService from '../services/logic/todo-service'
import IAuthRequest from '../types/middleware/IAuthRequest'
import ICreateTodoRequest from '../types/controllers/ICreateTodoRequest'
import IUserPayload from '../types/services/IUserPayload'
import ITodoPayload from '../types/services/ITodoPayload'

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
  async getAllTodos(req: IAuthRequest, res: Response, next: NextFunction) {}
  async getTodoById(req: IAuthRequest, res: Response, next: NextFunction) {}
  async updateTodo(req: IAuthRequest, res: Response, next: NextFunction) {}
  async deleteTodo(req: IAuthRequest, res: Response, next: NextFunction) {}
}

export default new TodoController()
