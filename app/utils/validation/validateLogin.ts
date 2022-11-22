import validator from 'validator'
import ApiError from '../error/api-error'
import CustomValidator from './customValidator'

export const validateLogin = (login: string, password: string) => {
  if (validator.isEmpty(login)) {
    throw ApiError.badRequest('Login is empty')
  }
  if (validator.isEmpty(password)) {
    throw ApiError.badRequest('Password is empty')
  }
  if (validator.isLength(login, { min: 3, max: 16 })) {
    throw ApiError.badRequest('Login must be between 3 and 16 characters')
  }
  if (
    !CustomValidator.wontStartWithNumber(login) &&
    !CustomValidator.isLatinLettersAndNumbers(login)
  ) {
    throw ApiError.badRequest('Login must contain only Latin letters and numbers')
  }
  if (
    validator.isStrongPassword(password, {
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
