import { Types } from 'mongoose'
import IUserDto from '../types/IUserDto'
/**
 * @description get data transfer object for generating JWT tokens
 * @function getUserDto
 * @param {string} login - user login
 * @param {Types.ObjectId} id - id of user
 * @returns {IUserDto} data transfer object for generating JWT tokens
 * @example
 * const dto = getUserDto('test', '5f9f1c9b9b9b9b9b9b9b9b9b')
 * console.log(dto)
 */
export const getUserDto = (login: string, id: Types.ObjectId): IUserDto => ({
  login,
  id,
})
