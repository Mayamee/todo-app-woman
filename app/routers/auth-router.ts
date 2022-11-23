import { Router } from 'express'
import authController from '../controllers/auth-controller'
import {
  validateLoginRegisterMiddleware,
  validateRefreshTokenMiddleware,
} from '../middleware/validate-middleware'
const router = Router()

router
  .post('/register', validateLoginRegisterMiddleware, authController.register)
  .post('/login', validateLoginRegisterMiddleware, authController.login)
  .get('/logout', validateRefreshTokenMiddleware, authController.logout)
  .get('/refresh', validateRefreshTokenMiddleware, authController.refresh)

export default router
