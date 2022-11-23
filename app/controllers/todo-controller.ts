import { NextFunction, Response } from 'express'
import todoService from '../services/logic/todo-service'
import IAuthRequest from '../types/middleware/IAuthRequest'
import ICreateTodoRequest from '../types/controllers/ICreateTodoRequest'
import IUserPayload from '../types/services/IUserPayload'

class TodoController {
  async createTodo(req: ICreateTodoRequest, res: Response, next: NextFunction) {
    const { id: userId, login } = req.user as IUserPayload
    const {
      body: { title, description, todoBody },
    } = req
    const todoInfo = await todoService.createTodo()
  }
  async getAllTodos(req: IAuthRequest, res: Response, next: NextFunction) {}
  async getTodoById(req: IAuthRequest, res: Response, next: NextFunction) {}
  async updateTodo(req: IAuthRequest, res: Response, next: NextFunction) {}
  async deleteTodo(req: IAuthRequest, res: Response, next: NextFunction) {}
}

export default new TodoController()
