import { getUserDto } from '../../dto/user-dto'
import UserModel from '../../models/UserModel'
import IDeleteResult from '../../types/IDeleteResult'
import ITodoWithTokensPayload from '../../types/ITodoWithTokensPayload'
import IUserData, { IUserDataWithId } from '../../types/IUserData'
import { comparePassword, hashPassword } from '../../utils/crypto/hashing'
import ApiError from '../../utils/error/api-error'
import TokenService from './token-service'

/**
 * Service for user authentication that
 * contains all the methods for user authentication
 */
class UserService {
  /**
   * Register user in database and return user data
   * @param {IUserData} userData - user data
   * @throws {ApiError} 400 - User with provided login already exists
   * @return {Promise<ITodoWithTokensPayload>} user data
   * @example
   * UserService.registerUser({
   * login: 'test',
   * password: 'test',
   * }).then((data) => {
   * console.log(data)
   * })
   */
  async registerUser({ login, password }: IUserData): Promise<ITodoWithTokensPayload> {
    const candidate = await this.getUserByLogin(login)
    if (candidate !== null) {
      throw ApiError.badRequest(`User already exists`)
    }
    const hashedPassword = await hashPassword(password)
    const user = await UserModel.create({ login, password: hashedPassword })
    const dto = getUserDto(user.login, user._id)
    const tokens = TokenService.generateTokens(dto)
    await TokenService.saveToken(user._id, tokens.refreshToken)
    return { ...dto, ...tokens }
  }
  /**
   * Login user in database and return user data with tokens
   * @param {IUserData} userData - user data
   * @throws {ApiError} 400 - User with provided login does not exist
   * @return {Promise<ITodoWithTokensPayload>} user data
   * @example
   * UserService.loginUser({
   * login: 'test',
   * password: 'test',
   * }).then((data) => {
   * console.log(data)
   * })
   */
  async loginUser({ login, password }: IUserData): Promise<ITodoWithTokensPayload> {
    const candidate = await this.getUserByLogin(login)
    if (candidate === null) {
      throw ApiError.badRequest('Invalid login or password')
    }
    const isPasswordValid = await comparePassword(password, candidate.password)
    if (!isPasswordValid) {
      throw ApiError.badRequest('Invalid login or password')
    }
    const dto = getUserDto(candidate.login, candidate._id)
    const tokens = TokenService.generateTokens(dto)
    await TokenService.saveToken(candidate._id, tokens.refreshToken)
    return { ...dto, ...tokens }
  }
  /**
   * Logout user in database and return delete result
   * @param {string} refreshToken - refresh token
   * @return {Promise<IDeleteResult>} delete result
   * @example
   * UserService.logoutUser('refreshToken').then((data) => {
   * console.log(data)
   * })
   */
  async logoutUser(refreshToken: string): Promise<IDeleteResult> {
    const token = await TokenService.removeToken(refreshToken)
    return token
  }
  /**
   * Get user by login from database and return user data
   * @param {string} login - user login
   * @return {Promise<IUserDataWithId | null>} user data
   * @example
   * UserService.getUserByLogin('test').then((data) => {
   * console.log(data)
   * })
   */
  async getUserByLogin(login: string): Promise<IUserDataWithId | null> {
    const user = await UserModel.findOne({ login })
    return user
  }
  /**
   * Update tokens of user in database and return user data with tokens
   * @param {string} refreshToken - refresh token
   * @throws {ApiError} 401 - Invalid refresh token
   * @throws {ApiError} 401 - Refresh token was not found
   * @return {Promise<ITodoWithTokensPayload>} user data
   * @example
   * UserService.refreshUser('refreshToken').then((data) => {
   * console.log(data)
   * })
   */
  async refreshUser(refreshToken: string): Promise<ITodoWithTokensPayload> {
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
