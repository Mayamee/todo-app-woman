import validator from 'validator'
import ApiError from '../error/api-error'

/**
 * @function validatePassword
 * @description validate password
 * @param {string} password - password to validate
 * @throws {ApiError} 400 - Password is empty
 * @throws {ApiError} 400 - Password must contain at least 8 characters, 1 lowercase, 1 uppercase, 1 number and 1 symbol
 * @returns {void}
 * @example
 * validatePassword('test123')
 * validatePassword('test123!')
 */
const validatePassword = (password: string): void => {
  if (validator.isEmpty(password)) {
    throw ApiError.badRequest('Password is empty')
  }
  if (
    !validator.isStrongPassword(password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
  ) {
    throw ApiError.badRequest(
      'Password must contain at least 8 characters, 1 lowercase, 1 uppercase, 1 number and 1 symbol'
    )
  }
}
export default validatePassword
