import { NextFunction, Response } from 'express'
import TokenService from '../services/auth/token-service'
import IAuthRequest from '../types/IAuthRequest'
import ApiError from '../utils/error/api-error'

/**
 * @description Middleware for user authentication and validation of access token
 * If the user is authorized, the user data is written to the request
 * @function authMiddleware
 * @param {IAuthRequest} req - request with authorization header
 * @param {Response} res - response
 * @param {NextFunction} next - next function
 * @throws {ApiError} 401 - Not authorized if authorization header is not provided
 * @throws {ApiError} 401 - Not authorized if supporte token type is not Bearer
 * @throws {ApiError} 401 - Not authorized if access token is not valid
 * @returns {void}
 */
export default function authMiddleware(
  req: IAuthRequest,
  _res: Response,
  next: NextFunction
): void {
  try {
    const { authorization } = req.headers
    if (!authorization) {
      throw ApiError.unauthorized('Not authorized')
    }
    const [type, token] = authorization.split(' ')
    if (type !== 'Bearer') {
      throw ApiError.unauthorized('Supported authorization type: Bearer')
    }
    if (!token) {
      throw ApiError.unauthorized('No token provided')
    }
    const tokenData = TokenService.validateAccessToken(token)
    if (!tokenData) {
      throw ApiError.unauthorized('Invalid token')
    }
    req.user = tokenData
    next()
  } catch (err) {
    next(err)
  }
}
