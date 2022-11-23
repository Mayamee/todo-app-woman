import { Router } from 'express'
import authController from '../controllers/auth-controller'
import { validateRegisterMiddleware } from '../middleware/validateMiddleware'
const router = Router()

router
  .post('/register', validateRegisterMiddleware, authController.register)
  .post('login', authController.login)
  .post('logout', authController.logout)

export default router
