import { Router } from 'express'
import todoController from '../controllers/todo-controller'
import {
  validateGetAllTodosMiddleware,
  validateParamsIdMiddleware,
  validateTodoPalyoadMiddleware,
} from '../middleware/validate-middleware'
/**
 * @decription Todo routes
 * @path /api/v1/todo
 * @method POST
 * @access Private
 * @param {string} path - /create
 * @param {function} middleware - validateTodoPalyoadMiddleware - validate todo payload
 * @param {function} middleware - todoController.createTodo - create todo
 * @method GET
 * @access Private
 * @param {string} path - /all
 * @param {function} middleware - validateGetAllTodosMiddleware - validate query params
 * @param {function} middleware - todoController.getAllTodos - get all todos
 * @method GET
 * @access Private
 * @param {string} path - /:id
 * @param {function} middleware - validateParamsIdMiddleware - validate provided todo id
 * @param {function} middleware - todoController.getTodoById - get todo by id
 * @method PUT
 * @access Private
 * @param {string} path - /:id
 * @param {function} middleware - validateParamsIdMiddleware - validate provided todo id
 * @param {function} middleware - validateTodoPalyoadMiddleware - validate todo payload
 * @param {function} middleware - todoController.updateTodo - update todo
 * @method DELETE
 * @access Private
 * @param {string} path - /:id
 * @param {function} middleware - validateParamsIdMiddleware - validate provided todo id
 * @param {function} middleware - todoController.deleteTodo - delete todo
 */
const router = Router()
router
  .post('/create', validateTodoPalyoadMiddleware, todoController.createTodo)
  .get('/all', validateGetAllTodosMiddleware, todoController.getAllTodos)
  .get('/:id', validateParamsIdMiddleware, todoController.getTodoById)
  .put('/:id', validateParamsIdMiddleware, validateTodoPalyoadMiddleware, todoController.updateTodo)
  .delete('/:id', validateParamsIdMiddleware, todoController.deleteTodo)

export default router
