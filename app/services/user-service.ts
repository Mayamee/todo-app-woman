import { getUserDto } from '../dto/user-dto'
import UserModel from '../models/UserModel'
import { IUserData } from '../types/services/IUserData'
import { comparePassword, hashPassword } from '../utils/crypto/hashing'
import ApiError from '../utils/error/api-error'
import TokenService from './token-service'

class UserService {
  async registerUser({ login, password }: IUserData) {
    const candidate = await this.getUserByLogin(login)
    if (candidate !== null) {
      throw ApiError.badRequest(`User with login ${login} already exists`)
    }
    const hashedPassword = await hashPassword(password)
    const user = await UserModel.create({ login, password: hashedPassword })
    const dto = getUserDto(user.login, user._id)
    const tokens = TokenService.generateTokens(dto)
    await TokenService.saveToken(user._id, tokens.refreshToken)
    return { ...dto, ...tokens }
  }
  async loginUser({ login, password }: IUserData) {
    const candidate = await this.getUserByLogin(login)
    if (candidate === null) {
      throw ApiError.badRequest(`User with login ${login} does not exist`)
    }
    const isPasswordValid = await comparePassword(password, candidate.password)
    if (!isPasswordValid) {
      throw ApiError.badRequest('Invalid password')
    }
    const dto = getUserDto(candidate.login, candidate._id)
    const tokens = TokenService.generateTokens(dto)
    await TokenService.saveToken(candidate._id, tokens.refreshToken)
    return { ...dto, ...tokens }
  }
  async logoutUser(refreshToken: string) {
    const token = await TokenService.removeToken(refreshToken)
    return token
  }
  async getUserByLogin(login: string) {
    const user = await UserModel.findOne({ login })
    return user
  }
  async refreshUser(refreshToken: string) {
    const userData = TokenService.validateRefreshToken(refreshToken)
    if (!userData) {
      throw ApiError.unauthorized('Invalid refresh token')
    }
    const tokenFromDb = await TokenService.findRefreshToken(refreshToken)
    if (!tokenFromDb) {
      throw ApiError.unauthorized('Refresh token was not found')
    }
    const user = await this.getUserByLogin(userData.login)
    if (!user) {
      throw ApiError.unauthorized('User was not found')
    }
    const dto = getUserDto(user.login, user._id)
    const tokens = TokenService.generateTokens(dto)
    await TokenService.saveToken(user._id, tokens.refreshToken)
    return { ...dto, ...tokens }
  }
}

export default new UserService()
