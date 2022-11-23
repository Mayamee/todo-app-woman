import { Router } from 'express'
import todoController from '../controllers/todo-controller'
import { validateCreateTodoMiddleware } from '../middleware/validate-middleware'
const router = Router()

router
  .post('/create', validateCreateTodoMiddleware, todoController.createTodo)
  .get('/all', todoController.getAllTodos)
  .get('/:id', todoController.getTodoById)
  .put('/:id', todoController.updateTodo)
  .delete('/:id', todoController.deleteTodo)

export default router
