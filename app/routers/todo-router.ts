import { Router } from 'express'
import todoController from '../controllers/todo-controller'
const router = Router()

router
  .post('/create', todoController.createTodo)
  .get('/all', todoController.getAllTodos)
  .get('/:id', todoController.getTodoById)
  .put('/:id', todoController.updateTodo)
  .delete('/:id', todoController.deleteTodo)

export default router
