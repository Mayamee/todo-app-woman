import { Response, NextFunction } from 'express'
import UserService from '../services/auth/user-service'
import ICookieRequest from '../types/controllers/ICookieRequest'
import { IRegisterLoginRequest } from '../types/controllers/IRegisterLogin'

/**
 * @description Auth controller
 * @class AuthController
 * @method register
 * @description register user
 * @param {IRegisterLoginRequest} req - request with login and password in body
 * @param {Response} res - response with user data and tokens
 * @param {NextFunction} next - next function
 * @returns {Promise<void>}
 * @method login
 * @description login user
 * @param {IRegisterLoginRequest} req - request with login and password in body
 * @param {Response} res - response with user data and tokens
 * @param {NextFunction} next - next function
 * @returns {Promise<void>}
 * @method logout
 * @description logout user
 * @param {ICookieRequest} req - request with refresh token in cookies
 * @param {Response} res - response with delete result
 * @param {NextFunction} next - next function
 * @returns {Promise<void>}
 * @method refresh
 * @description update tokens for user
 * @param {ICookieRequest} req - request with refresh token in cookies
 * @param {Response} res - response with new tokens
 * @param {NextFunction} next - next function
 * @returns {Promise<void>}
 */
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
  async refresh(req: ICookieRequest, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies
      const userInfo = await UserService.refreshUser(refreshToken)
      res.cookie('refreshToken', userInfo.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      })
      return res.status(200).json(userInfo)
    } catch (err) {
      next(err)
    }
  }
}

export default new AuthController()
