import validator from 'validator'
import ApiError from '../error/api-error'
import customValidator from './customValidator'

/**
 * @function validateLogin
 * @description validate login
 * @param {string} login - login to validate
 * @throws {ApiError} 400 - Login is empty
 * @throws {ApiError} 400 - Login must be between 3 and 16 characters
 * @throws {ApiError} 400 - Login must start with a letter
 * @throws {ApiError} 400 - Login must contain only Latin letters and numbers
 * @returns {void}
 * @example
 * validateLogin('test')
 * validateLogin('test123')
 */
const validateLogin = (login: string): void => {
  if (validator.isEmpty(login)) {
    throw ApiError.badRequest('Login is empty')
  }
  if (!validator.isLength(login, { min: 3, max: 16 })) {
    throw ApiError.badRequest('Login must be between 3 and 16 characters')
  }
  if (customValidator.isStartWithNumber(login)) {
    throw ApiError.badRequest('Login must start with a letter')
  }
  if (!customValidator.isContainOnlyLatinLettersAndNumbers(login)) {
    throw ApiError.badRequest('Login must contain only latin letters and numbers')
  }
}
export default validateLogin
