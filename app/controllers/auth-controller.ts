import { Request, Response, NextFunction } from 'express'
import UserService from '../services/user-service'
import { IRegisterLoginRequest } from '../types/controllers/IRegisterLogin'
import ApiError from '../utils/error/api-error'

class AuthController {
  async register(req: IRegisterLoginRequest, res: Response, next: NextFunction) {
    try {
      const { login, password } = req.body
      const candidate = await UserService.getUserByLogin(login)
      if (candidate !== null) {
        throw ApiError.badRequest(`User with login ${login} already exists`)
      }
      const userInfo = await UserService.registerUser({ login, password })
      res.cookie('refreshToken', userInfo.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      })
      return res.json(userInfo)
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
