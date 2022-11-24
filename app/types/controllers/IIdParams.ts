import IAuthRequest from '../middleware/IAuthRequest'

export default interface IIdParams extends IAuthRequest {
  params: {
    id: string
  }
}
