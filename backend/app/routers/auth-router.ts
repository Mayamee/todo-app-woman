import { Router as router } from 'express'
import authController from '../controllers/auth-controller'
import {
  validateLoginRegisterMiddleware,
  validateRefreshTokenMiddleware,
} from '../middleware/validate-middleware'
/**
 * @decription Auth routes
 * @path /api/v1/auth
 * @method POST
 * @access Public
 * @param {string} path - /register
 * @param {function} middleware - validateLoginRegisterMiddleware
 * @param {function} middleware - authController.register
 *
 * @method POST
 * @access Public
 * @param {string} path - /login
 * @param {function} middleware - validateLoginRegisterMiddleware - validate login and password
 * @param {function} middleware - authController.login - login user
 *
 * @method GET
 * @access Public
 * @param {string} path - /logout
 * @param {function} middleware - validateRefreshTokenMiddleware - validate refresh token
 * @param {function} middleware - authController.logout - logout user
 *
 * @method GET
 * @access Public
 * @param {string} path - /refresh
 * @param {function} middleware - validateRefreshTokenMiddleware - validate refresh token
 * @param {function} middleware - authController.refresh - refresh tokens
 */
const authRouter = router()
  .post('/register', validateLoginRegisterMiddleware, authController.register)
  .post('/login', validateLoginRegisterMiddleware, authController.login)
  .get('/logout', validateRefreshTokenMiddleware, authController.logout)
  .get('/refresh', validateRefreshTokenMiddleware, authController.refresh)

export default authRouter
