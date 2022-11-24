import { NextFunction, Request, Response } from 'express'
import { IRegisterLoginRequest } from '../types/controllers/IRegisterLogin'
import ITodoPayloadRequest from '../types/controllers/ITodoPayloadRequest'
import ApiError from '../utils/error/api-error'
import validateLogin from '../utils/validation/validateLogin'
import validatePassword from '../utils/validation/validatePassword'
import IGetAllTodoRequest from '../types/middleware/IGetAllTodoRequest'
import customValidator from '../utils/validation/customValidator'
import IIdParamsRequest from '../types/controllers/IIdParamsRequest'
import { isValidObjectId } from 'mongoose'

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

export function validateTodoPalyoadMiddleware(
  req: ITodoPayloadRequest,
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
    //TODO refactor this
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

export function validateParamsIdMiddleware(
  req: IIdParamsRequest,
  _res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params
    if (!id || !isValidObjectId(id)) {
      throw ApiError.badRequest('Invalid todo id')
    }
    next()
  } catch (err) {
    next(err)
  }
}
