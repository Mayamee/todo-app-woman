import jwt from 'jsonwebtoken'
import { Types } from 'mongoose'
import { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } from '../../env/env'
import TokenModel from '../../models/TokenModel'
import { JWTPayload } from '../../types/jwt/payload'
import IUserPayload from '../../types/services/IUserPayload'

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
