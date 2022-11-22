import { Request, Response, NextFunction } from 'express'
import userService from '../services/user-service'
import { validateLogin } from '../utils/validation/validateLogin'

interface IRegisterRequest extends Request {
  body: {
    login: string
    password: string
  }
}

class AuthController {
  async register(req: IRegisterRequest, res: Response, next: NextFunction) {
    try {
      const { login, password } = req.body
      validateLogin(login, password)
			// const candidate = await userService.getUserByLogin(login)
    } catch (err) {
      next(err)
    }
  }
  async login(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (err) {
      next(err)
    }
  }
  async logout(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (err) {
      next(err)
    }
  }
}

export default new AuthController()
