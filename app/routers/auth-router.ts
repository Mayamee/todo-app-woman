import { Router } from 'express'
import authController from '../controllers/auth-controller'
import { validateLoginRegisterMiddleware } from '../middleware/validateMiddleware'
const router = Router()

router
  .post('/register', validateLoginRegisterMiddleware, authController.register)
  .post('/login', validateLoginRegisterMiddleware, authController.login)
  .post('/logout', authController.logout)

export default router
