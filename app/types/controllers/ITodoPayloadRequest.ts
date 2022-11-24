import IAuthRequest from '../middleware/IAuthRequest'
import ITodoBody from '../services/ITodoBody'

export default interface ITodoPayloadRequest extends IAuthRequest {
  body: ITodoBody
}

export interface ITodoPayloadAndIdRequest extends ITodoPayloadRequest {
  params: {
    id: string
  }
}
