import ITokenPayload from './ITokenPayload'
import IUserDto from './IUserDto'

export default interface ITodoWithTokensPayload extends IUserDto, ITokenPayload {}
