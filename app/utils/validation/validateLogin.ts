import validator from 'validator'
import ApiError from '../error/api-error'
import customValidator from './customValidator'

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
    throw ApiError.badRequest('Login must contain only Latin letters and numbers')
  }
}
export default validateLogin
