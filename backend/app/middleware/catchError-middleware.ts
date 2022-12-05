import { Request, Response } from 'express'

import ApiError from '../utils/error/api-error'

/**
 * @description Middleware for catching errors
 * If an error occurs, the error is written to the response
 * @function catchErrorMiddleware
 * @param {ApiError | Error} err - error object
 * @param {Request} req - request
 * @param {Response} res - response
 * @param {NextFunction} next - next function
 * @return {void}
 * @example
 * app.use(catchErrorMiddleware)
 */
export default function catchErrorMiddleware(
  err: ApiError | Error,
  req: Request,
  res: Response
): void {
  if (err instanceof ApiError) {
    res.status(err.status).json({ message: err.message })
    return
  } else {
    console.info(err)
    res.status(500).json({ message: 'Internal server error' })
  }
}
