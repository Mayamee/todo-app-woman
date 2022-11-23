import { NextFunction, Request, Response } from 'express'
import { IRegisterLoginRequest } from '../types/controllers/IRegisterLogin'
import { validateLogin } from '../utils/validation/validateLogin'

export function validateLoginRegisterMiddleware(
  req: IRegisterLoginRequest,
  _res: Response,
  next: NextFunction
) {
  try {
    const { login, password } = req.body
    validateLogin(login, password)
    next()
  } catch (err) {
    next(err)
  }
}
