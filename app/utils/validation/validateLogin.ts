import validator from 'validator'
import ApiError from '../error/api-error'
import CustomValidator from './customValidator'

const validateLogin = (login: string): void => {
  if (validator.isEmpty(login)) {
    throw ApiError.badRequest('Login is empty')
  }
  if (!validator.isLength(login, { min: 3, max: 16 })) {
    throw ApiError.badRequest('Login must be between 3 and 16 characters')
  }
  if (CustomValidator.isStartWithNumber(login)) {
    throw ApiError.badRequest('Login must start with a letter')
  }
  if (!CustomValidator.isContainOnlyLatinLettersAndNumbers(login)) {
    throw ApiError.badRequest('Login must contain only Latin letters and numbers')
  }
}
export default validateLogin
