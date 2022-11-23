import IAuthRequest from './IAuthRequest'

export default interface IGetAllTodoRequest extends IAuthRequest {
  query: {
    limit?: string
    page?: string
  }
}
