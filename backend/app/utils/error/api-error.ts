/**
 * ApiError class for handling errors in api requests
 * @extends Error
 * @example
 * ApiError.badRequest('Bad request')
 * ApiError.unauthorized('Unauthorized')
 * ApiError.forbidden('Forbidden')
 * ApiError.notFound('Not found')
 * ApiError.conflict('Conflict')
 */
export default class ApiError extends Error {
  /**
   * Creates an instance of ApiError
   * @param {number} status - Error status code
   * @param {string} message - Error message
   */
  constructor(public status: number, public message: string) {
    super(message)
  }
  /**
   * Static method for creating ApiError with status 400
   * @param {string} message - Error message
   * @return {ApiError} ApiError instance with status 400 and provided message
   */
  static badRequest = (message: string): ApiError => new ApiError(400, message)
  /**
   * Static method for creating 401 api error
   * @param {string} message - Error message
   * @return {ApiError} ApiError instance with status 401 and provided message
   */
  static unauthorized = (message: string): ApiError => new ApiError(401, message)
  /**
   * Static method for creating 403 api error
   * @param {string} message - Error message
   * @return {ApiError} ApiError instance with status 403 and provided message
   */
  static forbidden = (message: string): ApiError => new ApiError(403, message)
  /**
   * Static method for creating 404 api error
   * @param {string} message - Error message
   * @return {ApiError} ApiError instance with status 404 and provided message
   */
  static notFound = (message: string): ApiError => new ApiError(404, message)
  /**
   * Static method for creating 409 api error
   * @param {string} message - Error message
   * @return {ApiError} ApiError instance with status 409 and provided message
   */
  static conflict = (message: string): ApiError => new ApiError(409, message)
}
