import IAuthRequest from './IAuthRequest'
import ITodoBody from './ITodoBody'

export default interface ITodoPayloadRequest extends IAuthRequest {
  body: ITodoBody
}

export interface ITodoPayloadAndIdRequest extends ITodoPayloadRequest {
  params: {
    id: string
  }
}
