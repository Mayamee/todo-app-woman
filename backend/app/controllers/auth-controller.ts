import { Response, NextFunction } from 'express'
import UserService from '../services/auth/user-service'
import ICookieRequest from '../types/ICookieRequest'
import { IRegisterLoginRequest } from '../types/IRegisterLogin'

/**
 * Controller for user authentication that
 * contains all the methods for user authentication
 */
class AuthController {
  /**
   * Register user in system
   * @param {IRegisterLoginRequest} req - request with login and password in body
   * @param {Response} res - response with user data and tokens
   * @param {NextFunction} next - next function
   * @return {Promise<void>} void promise
   */
  async register(req: IRegisterLoginRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { login, password } = req.body
      const userInfo = await UserService.registerUser({ login, password })
      res.cookie('refreshToken', userInfo.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      })
      res.status(200).json(userInfo)
    } catch (err) {
      next(err)
    }
  }
  /**
   * Login user in system
   * @description login user
   * @param {IRegisterLoginRequest} req - request with login and password in body
   * @param {Response} res - response with user data and tokens
   * @param {NextFunction} next - next function
   * @return {Promise<void>} void promise
   */
  async login(req: IRegisterLoginRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { login, password } = req.body
      const userInfo = await UserService.loginUser({ login, password })
      res.cookie('refreshToken', userInfo.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      })
      res.status(200).json(userInfo)
    } catch (err) {
      next(err)
    }
  }
  /**
   * Logout user from system
   * @param {ICookieRequest} req - request with refresh token in cookies
   * @param {Response} res - response with delete result
   * @param {NextFunction} next - next function
   * @return {Promise<void>} void promise
   */
  async logout(req: ICookieRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { refreshToken } = req.cookies
      const token = await UserService.logoutUser(refreshToken)
      res.clearCookie('refreshToken')
      res.status(200).json(token)
    } catch (err) {
      next(err)
    }
  }
  /**
   * Update tokens for user in system
   * @param {ICookieRequest} req - request with refresh token in cookies
   * @param {Response} res - response with new tokens
   * @param {NextFunction} next - next function
   * @return {Promise<void>} void promise
   */
  async refresh(req: ICookieRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { refreshToken } = req.cookies
      const userInfo = await UserService.refreshUser(refreshToken)
      res.cookie('refreshToken', userInfo.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      })
      res.status(200).json(userInfo)
    } catch (err) {
      next(err)
    }
  }
}

export default new AuthController()
