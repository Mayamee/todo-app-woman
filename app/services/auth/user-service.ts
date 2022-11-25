import { getUserDto } from '../../dto/user-dto'
import UserModel from '../../models/UserModel'
import IUserData from '../../types/IUserData'
import { comparePassword, hashPassword } from '../../utils/crypto/hashing'
import ApiError from '../../utils/error/api-error'
import TokenService from './token-service'
/**
 * @description Service for user authentication
 * @class UserService
 * @method registerUser
 * @description register user
 * @param {IUserData} userData - user data
 * @type {{login: string, id: string}} IUserData
 * @throws {ApiError} 400 - User with provided login already exists
 * @returns {Promise<{accessToken: string, refreshToken: string, login: string, id: ObjectId}>} user data
 * @example
 * UserService.registerUser({
 * login: 'test',
 * password: 'test',
 * }).then((data) => {
 * console.log(data)
 * })
 * @method loginUser
 * @description login user
 * @param {IUserData} userData - user data
 * @type {{login: string, id: string}} IUserData
 * @throws {ApiError} 400 - User with provided login does not exist
 * @returns {Promise<{accessToken: string, refreshToken: string, login: string, id: ObjectId}>} user data
 * @example
 * UserService.loginUser({
 * login: 'test',
 * password: 'test',
 * }).then((data) => {
 * console.log(data)
 * })
 * @method logoutUser
 * @description logout user
 * @param {string} refreshToken - refresh token
 * @throws {ApiError} 400 - User with provided refresh token does not exist
 * @returns {Promise<DeleteResult>}
 * @example
 * UserService.logoutUser('refreshToken').then((data) => {
 * console.log(data)
 * })
 * @method getUserByLogin
 * @description get user by login
 * @param {string} login - user login
 * @returns {Promise<{login: string, password: string} | null>} user data
 * @example
 * UserService.getUserByLogin('test').then((data) => {
 * console.log(data)
 * })
 * @method refreshUser
 * @description update tokens of user
 * @param {string} refreshToken - refresh token
 * @throws {ApiError} 401 - Invalid refresh token
 * @throws {ApiError} 401 - Refresh token was not found
 * @returns {Promise<{accessToken: string, refreshToken: string, login: string, id: ObjectId}>} user data
 * @example
 * UserService.refreshUser('refreshToken').then((data) => {
 * console.log(data)
 * })
 */
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
      throw ApiError.unauthorized('User with provided refresh token does not exist')
    }
    const dto = getUserDto(user.login, user._id)
    const tokens = TokenService.generateTokens(dto)
    await TokenService.saveToken(user._id, tokens.refreshToken)
    return { ...dto, ...tokens }
  }
}

export default new UserService()
