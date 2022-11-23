import jwt, { Secret } from 'jsonwebtoken'
import { Types } from 'mongoose'
import applyEnv from '../env/applyEnv'
import TokenModel from '../models/TokenModel'
import { JWTPayload } from '../types/jwt/payload'
applyEnv()

class TokenService {
  generateTokens(payload: JWTPayload) {
    const jwtAccessSecret = process.env.JWT_ACCESS_SECRET as Secret | undefined
    const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET as Secret | undefined

    if (!jwtAccessSecret || !jwtRefreshSecret) {
      console.error('JWT_ACCESS_SECRET or JWT_REFRESH_SECRET is not defined')
      process.exit(1)
    }

    const accessToken = jwt.sign(payload, jwtAccessSecret, { expiresIn: '30m' })
    const refreshToken = jwt.sign(payload, jwtRefreshSecret, { expiresIn: '30d' })
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
}

export default new TokenService()
