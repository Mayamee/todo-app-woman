import { Router } from 'express'
import todoController from '../controllers/todo-controller'
import {
  validateGetAllTodosMiddleware,
  validateParamsIdMiddleware,
  validateTodoPalyoadMiddleware,
} from '../middleware/validate-middleware'
const router = Router()

router
  .post('/create', validateTodoPalyoadMiddleware, todoController.createTodo)
  .get('/all', validateGetAllTodosMiddleware, todoController.getAllTodos)
  .get('/:id', validateParamsIdMiddleware, todoController.getTodoById)
  .put('/:id', validateParamsIdMiddleware, validateTodoPalyoadMiddleware, todoController.updateTodo)
  .delete('/:id', validateParamsIdMiddleware, todoController.deleteTodo)

export default router
