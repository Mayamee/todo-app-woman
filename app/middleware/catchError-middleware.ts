import { Request, Response, NextFunction } from 'express'

import ApiError from '../utils/error/api-error'

export default function catchErrorMiddleware(
  err: ApiError | Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message })
  } else {
		console.info(err)
    res.status(500).json({ message: 'Internal server error' })
  }
}
