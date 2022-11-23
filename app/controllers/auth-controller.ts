import { Request, Response, NextFunction } from 'express'
import UserService from '../services/user-service'
import ICookieRequest from '../types/controllers/ICookieRequest'
import { IRegisterLoginRequest } from '../types/controllers/IRegisterLogin'

class AuthController {
  async register(req: IRegisterLoginRequest, res: Response, next: NextFunction) {
    try {
      const { login, password } = req.body
      const userInfo = await UserService.registerUser({ login, password })
      res.cookie('refreshToken', userInfo.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      })
      return res.status(200).json(userInfo)
    } catch (err) {
      next(err)
    }
  }
  async login(req: IRegisterLoginRequest, res: Response, next: NextFunction) {
    try {
      const { login, password } = req.body
      const userInfo = await UserService.loginUser({ login, password })
      res.cookie('refreshToken', userInfo.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      })
      return res.status(200).json(userInfo)
    } catch (err) {
      next(err)
    }
  }
  async logout(req: ICookieRequest, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies
      const token = await UserService.logoutUser(refreshToken)
      res.clearCookie('refreshToken')
      return res.status(200).json(token)
    } catch (err) {
      next(err)
    }
  }
}

export default new AuthController()
