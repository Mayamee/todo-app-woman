import UserModel from '../models/UserModel'
import { IUserData } from '../types/services/IUserData'
import { hashPassword } from '../utils/crypto/hashing'

class UserService {
  async registerUser({ login, password }: IUserData) {
    const hashedPassword = await hashPassword(password)
    const user = await UserModel.create({ login, password: hashedPassword })
		// TODO generate tokens
    return user
  }
  async loginUser(data: any) {}
  async logoutUser(data: any) {}
  async getUserByLogin(login: string) {
    const user = await UserModel.findOne({ login })
    return user
  }
}

export default new UserService()
