import { Router } from 'express'
import authController from '../controllers/auth-controller'
const router = Router()

router
  .post('/login', authController.login)
  .post('/register', authController.register)
  .post('/logout', authController.logout)

export default router
