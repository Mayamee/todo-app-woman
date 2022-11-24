import IAuthRequest from '../middleware/IAuthRequest'

export default interface IIdParamsRequest extends IAuthRequest {
  params: {
    id: string
  }
}
