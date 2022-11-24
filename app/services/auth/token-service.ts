import jwt from 'jsonwebtoken'
import { Types } from 'mongoose'
import { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } from '../../env/env'
import TokenModel from '../../models/TokenModel'
import { JWTPayload } from '../../types/jwt/payload'
import IUserPayload from '../../types/services/IUserPayload'

/**
 * @description Service for generating and validating JWT tokens
 * @class TokenService
 * @method generateTokens
 * @description generate access and refresh tokens
 * @param {JWTPayload} payload - payload for access token
 * @type {string | object | Buffer} JWTPayload
 * @returns {{accessToken: string, refreshToken: string}} access and refresh tokens
 * @example
 * TokenService.generateTokens({ id: '1' })
 * @method saveToken
 * @description save refresh token to database
 * @param {Object.Id} userId - id of user to bind refresh token
 * @param {string} refreshToken - refresh token
 * @returns {Promise<void>}
 * @example
 * TokenService.saveToken('637f312923050d8fae620d58', 'refreshToken').then(() => {
 *  console.log('Refresh token saved')
 * })
 * @method removeToken
 * @description remove refresh token from database
 * @param {string} refreshToken - refresh token
 * @returns {Promise<DeletedResult>} result of removing
 * @example
 * TokenService.removeToken('refreshToken').then((result) => {
 * console.log(result)
 * })
 * @method findRefreshToken
 * @description find refresh token in database
 * @param {string} refreshToken - refresh token
 * @returns {Promise<Token | null>} found token
 * @example
 * TokenService.findRefreshToken('refreshToken').then((token) => {
 * console.log(token)
 * })
 * @method validateRefreshToken
 * @description validate refresh token
 * @param {string} refreshToken - refresh token
 * @returns {Promise<IUserPayload | null>} payload of refresh token
 * @type {{login: string, id: string}} IUserPayload
 * @example
 * TokenService.validateRefreshToken('refreshToken').then((payload) => {
 * console.log(payload)
 * })
 * @method validateAccessToken
 * @description validate access token
 * @param {string} accessToken - access token
 * @returns {Promise<IUserPayload | null>} payload of access token
 * @type {{login: string, id: string}} IUserPayload
 * @example
 * TokenService.validateAccessToken('accessToken').then((payload) => {
 * console.log(payload)
 * })
 */
class TokenService {
  generateTokens(payload: JWTPayload) {
    const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET, { expiresIn: '30m' })
    const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: '30d' })
    return {
      accessToken,
      refreshToken,
    }
  }
  async saveToken(userId: Types.ObjectId, refreshToken: string) {
    const tokenData = await TokenModel.findOne({ user: userId })
    if (tokenData !== null) {
      tokenData.refreshToken = refreshToken
      await tokenData.save()
    } else {
      await TokenModel.create({ user: userId, refreshToken })
    }
  }
  async removeToken(refreshToken: string) {
    const tokenData = await TokenModel.deleteOne({ refreshToken })
    return tokenData
  }
  async findRefreshToken(refreshToken: string) {
    const tokenData = await TokenModel.findOne({
      refreshToken,
    })
    return tokenData
  }
  validateRefreshToken(refreshToken: string): IUserPayload | null {
    try {
      const userData = jwt.verify(refreshToken, JWT_REFRESH_SECRET) as IUserPayload
      return userData
    } catch (error) {
      return null
    }
  }
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
