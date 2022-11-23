import { NextFunction, Request, Response } from 'express'
import { IRegisterLoginRequest } from '../types/controllers/IRegisterLogin'
import ICreateTodoRequest from '../types/controllers/ICreateTodoRequest'
import ApiError from '../utils/error/api-error'
import validateLogin from '../utils/validation/validateLogin'
import validatePassword from '../utils/validation/validatePassword'
import IGetAllTodoRequest from '../types/middleware/IGetAllTodoRequest'
import customValidator from '../utils/validation/customValidator'

export function validateLoginRegisterMiddleware(
  req: IRegisterLoginRequest,
  _res: Response,
  next: NextFunction
) {
  try {
    const { login, password } = req.body
    validateLogin(login)
    validatePassword(password)
    next()
  } catch (err) {
    next(err)
  }
}

export function validateRefreshTokenMiddleware(req: Request, _res: Response, next: NextFunction) {
  try {
    const { refreshToken } = req.cookies as { refreshToken: string | undefined }
    if (!refreshToken) {
      throw ApiError.unauthorized('No refresh token provided')
    }
    next()
  } catch (err) {
    next(err)
  }
}

export function validateCreateTodoMiddleware(
  req: ICreateTodoRequest,
  _res: Response,
  next: NextFunction
) {
  try {
    const { title, description, todoBody } = req.body
    if (!title || !description || !todoBody) {
      throw ApiError.badRequest('Invalid todo body')
    }
    next()
  } catch (err) {
    next(err)
  }
}

export function validateGetAllTodosMiddleware(
  req: IGetAllTodoRequest,
  _res: Response,
  next: NextFunction
) {
  try {
    const { limit, page } = req.query
    if (page && !customValidator.isContainOnlyDigits(page)) {
      req.query.page = undefined
    }
    if (page && customValidator.isContainOnlyDigits(page) && parseInt(page) < 1) {
      req.query.page = undefined
    }
    if (limit && !customValidator.isContainOnlyDigits(limit) && Number(limit) < 0) {
      req.query.limit = undefined
    }
    if (limit && customValidator.isContainOnlyDigits(limit) && parseInt(limit) < 0) {
      req.query.limit = undefined
    }
    next()
  } catch (err) {
    next(err)
  }
}
