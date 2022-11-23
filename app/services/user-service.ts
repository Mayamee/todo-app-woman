import { getUserDto } from '../dto/user-dto'
import UserModel from '../models/UserModel'
import { IUserData } from '../types/services/IUserData'
import { hashPassword } from '../utils/crypto/hashing'
import TokenService from './token-service'

class UserService {
  async registerUser({ login, password }: IUserData) {
    const hashedPassword = await hashPassword(password)
    const user = await UserModel.create({ login, password: hashedPassword })
    const dto = getUserDto(user.login, user._id)
    const tokens = TokenService.generateTokens(dto)
    await TokenService.saveToken(user._id, tokens.refreshToken)
    return { ...dto, ...tokens }
  }
  async loginUser(data: any) {}
  async logoutUser(data: any) {}
  async getUserByLogin(login: string) {
    const user = await UserModel.findOne({ login })
    return user
  }
}

export default new UserService()
