import { NextFunction, Request, Response } from 'express'
import { IRegisterLoginRequest } from '../types/IRegisterLogin'
import ITodoPayloadRequest from '../types/ITodoPayloadRequest'
import ApiError from '../utils/error/api-error'
import validateLogin from '../utils/validation/validateLogin'
import validatePassword from '../utils/validation/validatePassword'
import IGetAllTodoRequest from '../types/IGetAllTodoRequest'
import customValidator from '../utils/validation/customValidator'
import IIdParamsRequest from '../types/IIdParamsRequest'
import { isValidObjectId } from 'mongoose'

/**
 * Middleware for validating login and password from request body
 * @function validateLoginRegisterMiddleware
 * @param {IRegisterLoginRequest} req - request with login and password in body
 * @param {Response} res - response
 * @param {NextFunction} next - next function
 * @return {void} void
 *
 */
export function validateLoginRegisterMiddleware(
  req: IRegisterLoginRequest,
  res: Response,
  next: NextFunction
): void {
  try {
    const { login, password } = req.body
    validateLogin(login)
    validatePassword(password)
    next()
  } catch (err) {
    next(err)
  }
}

/**
 * Middleware for validating Refresh Token from cookies
 * @function validateRefreshTokenMiddleware
 * @param {Request} req - request with refresh token in cookies
 * @param {Response} res - response
 * @param {NextFunction} next - next function
 * @throws {ApiError} 401 - if refresh token is not provided
 * @return {void} void
 */
export function validateRefreshTokenMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
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

/**
 * Middleware for validating todo payload from request body
 * @function validateTodoPalyoadMiddleware
 * @param {ITodoPayloadRequest} req - request with todo payload in body
 * @param {Response} res - response
 * @param {NextFunction} next - next function
 * @throws {ApiError} 400 - if todo payload is not valid
 * @return {void}
 */
export function validateTodoPalyoadMiddleware(
  req: ITodoPayloadRequest,
  res: Response,
  next: NextFunction
): void {
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

/**
 * Middleware for validating query pagination params from request query
 * If query params are not valid, default values are used
 * @function validateGetAllTodosMiddleware
 * @param {IGetAllTodoRequest} req - request with query pagination params
 * @param {Response} res - response
 * @param {NextFunction} next - next function
 * @return {void} void
 */
export function validateGetAllTodosMiddleware(
  req: IGetAllTodoRequest,
  res: Response,
  next: NextFunction
): void {
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

/**
 * Middleware for validating todo id from request params
 * @function validateTodoIdMiddleware
 * @param {IIdParamsRequest} req - request with todo id in params
 * @param {Response} res - response
 * @param {NextFunction} next - next function
 * @throws {ApiError} 400 - if todo id is not valid
 * @return {void}
 */
export function validateParamsIdMiddleware(
  req: IIdParamsRequest,
  res: Response,
  next: NextFunction
): void {
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
