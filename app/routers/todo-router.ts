import { Router } from 'express'
import todoController from '../controllers/todo-controller'
import {
  validateCreateTodoMiddleware,
  validateGetAllTodosMiddleware,
  validateParamsIdMiddleware,
} from '../middleware/validate-middleware'
const router = Router()

router
  .post('/create', validateCreateTodoMiddleware, todoController.createTodo)
  .get('/all', validateGetAllTodosMiddleware, todoController.getAllTodos)
  .get('/:id', validateParamsIdMiddleware, todoController.getTodoById)
  .put('/:id', validateParamsIdMiddleware, todoController.updateTodo)
  .delete('/:id', validateParamsIdMiddleware, todoController.deleteTodo)

export default router
