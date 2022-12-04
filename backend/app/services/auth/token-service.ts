import jwt from 'jsonwebtoken'
import { Types } from 'mongoose'
import { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } from '../../env/env'
import TokenModel from '../../models/TokenModel'
import { JWTPayload } from '../../types/JwtPayload'
import IUserPayload from '../../types/IUserPayload'
import ITokenPayload from '../../types/ITokenPayload'
import IDeleteResult from '../../types/IDeleteResult'
import IRefreshTokenPayload from '../../types/IRefreshTokenPayload'

/**
 * TokenService class that contains all the methods
 * for token generation and verification
 */
class TokenService {
  /**
   * Generate access and refresh tokens
   * @param {JWTPayload} payload - payload for generating tokens
   * @return {ITokenPayload} tokenPayload - access and refresh tokens
   * @example
   * TokenService.generateTokens({ id: '1' })
   */
  generateTokens(payload: JWTPayload): ITokenPayload {
    const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET, { expiresIn: '30m' })
    const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: '30d' })
    return {
      accessToken,
      refreshToken,
    }
  }
  /**
   * Saves refresh token to database
   * @param {Object.Id} userId - id of user to bind refresh token
   * @param {string} refreshToken - refresh token
   * @return {Promise<void>} void promise
   * @example
   * TokenService.saveToken('637f312923050d8fae620d58', 'refreshToken').then(() => {
   *  console.log('Refresh token saved')
   * })
   */
  async saveToken(userId: Types.ObjectId, refreshToken: string): Promise<void> {
    const tokenData = await TokenModel.findOne({ user: userId })
    if (tokenData !== null) {
      tokenData.refreshToken = refreshToken
      await tokenData.save()
    } else {
      await TokenModel.create({ user: userId, refreshToken })
    }
  }
  /**
   * Remove refresh token from database
   * @param {string} refreshToken - refresh token
   * @return {Promise<IDeleteResult>} result of removing
   * @example
   * TokenService.removeToken('refreshToken').then((result) => {
   * console.log(result)
   * })
   */
  async removeToken(refreshToken: string): Promise<IDeleteResult> {
    const tokenData = await TokenModel.deleteOne({ refreshToken })
    return tokenData
  }
  /**
   * Find refresh token in database
   * @param {string} refreshToken - refresh token
   * @return {Promise<IRefreshTokenPayload | null>} found token
   * @example
   * TokenService.findRefreshToken('refreshToken').then((token) => {
   * console.log(token)
   * })
   */
  async findRefreshToken(refreshToken: string): Promise<IRefreshTokenPayload | null> {
    const tokenData = (await TokenModel.findOne({
      refreshToken,
    })) as IRefreshTokenPayload | null
    return tokenData
  }
  /**
   * Validate refresh token and return user payload or null
   * @param {string} refreshToken - refresh token
   * @return {Promise<IUserPayload | null>} payload of refresh token
   * @example
   * TokenService.validateRefreshToken('refreshToken').then((payload) => {
   * console.log(payload)
   * })
   */
  validateRefreshToken(refreshToken: string): IUserPayload | null {
    try {
      const userData = jwt.verify(refreshToken, JWT_REFRESH_SECRET) as IUserPayload
      return userData
    } catch (error) {
      return null
    }
  }
  /**
   * Validate access token and return user payload or null
   * @param {string} accessToken - access token
   * @return {Promise<IUserPayload | null>} payload of access token
   * @example
   * TokenService.validateAccessToken('accessToken').then((payload) => {
   * console.log(payload)
   * })
   */
  validateAccessToken(accessToken: string): IUserPayload | null {
    try {
      const userData = jwt.verify(accessToken, JWT_ACCESS_SECRET) as IUserPayload
      return userData
    } catch (error) {
      return null
    }
  }
}

export default new TokenService()
