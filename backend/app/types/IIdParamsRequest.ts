import IAuthRequest from './IAuthRequest'

export default interface IIdParamsRequest extends IAuthRequest {
  params: {
    id: string
  }
}
