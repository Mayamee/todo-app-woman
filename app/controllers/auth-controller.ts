import { Request, Response, NextFunction } from 'express'
import UserService from '../services/user-service'
import { IRegisterLoginRequest } from '../types/controllers/IRegisterLogin'
import ApiError from '../utils/error/api-error'
import { validateLogin } from '../utils/validation/validateLogin'

class AuthController {
  async register(req: IRegisterLoginRequest, res: Response, next: NextFunction) {
    try {
      const { login, password } = req.body
      const candidate = await UserService.getUserByLogin(login)
      if (candidate !== null) {
        throw ApiError.badRequest(`User with login ${login} already exists`)
      }
      const userInfo = await UserService.registerUser({ login, password })
    } catch (err) {
      next(err)
    }
  }
  async login(req: IRegisterLoginRequest, res: Response, next: NextFunction) {
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
