import { NextFunction, Response } from 'express'
import TokenService from '../services/token-service'
import IAuthRequest from '../types/middleware/IAuthRequest'
import ApiError from '../utils/error/api-error'

export default function authMiddleware(req: IAuthRequest, _res: Response, next: NextFunction) {
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
