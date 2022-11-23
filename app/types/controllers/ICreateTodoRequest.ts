import IAuthRequest from '../middleware/IAuthRequest'
import ITodoBody from '../services/ITodoBody'

export default interface ICreateTodoRequest extends IAuthRequest {
  body: ITodoBody
}
