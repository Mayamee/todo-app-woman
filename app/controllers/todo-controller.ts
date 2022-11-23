import { NextFunction, Response } from 'express'
import IAuthRequest from '../types/middleware/IAuthRequest'

class TodoController {
  async createTodo(req: IAuthRequest, res: Response, next: NextFunction) {}
  async getAllTodos(req: IAuthRequest, res: Response, next: NextFunction) {}
  async getTodoById(req: IAuthRequest, res: Response, next: NextFunction) {}
  async updateTodo(req: IAuthRequest, res: Response, next: NextFunction) {}
  async deleteTodo(req: IAuthRequest, res: Response, next: NextFunction) {}
}

export default new TodoController()
