/**
 * @class ApiError
 * @extends Error
 * @description ApiError class
 * @constructor
 * @param {string} message - Error message
 * @param {number} status - Error status code
 * @returns {ApiError} ApiError instance
 * @static {ApiError} badRequest - Returns a 400 error
 * @static {ApiError} unauthorized - Returns a 401 error
 * @static {ApiError} forbidden - Returns a 403 error
 * @static {ApiError} notFound - Returns a 404 error
 * @static {ApiError} conflict - Returns a 409 error
 * @example
 * ApiError.badRequest('Bad request')
 * ApiError.unauthorized('Unauthorized')
 * ApiError.forbidden('Forbidden')
 * ApiError.notFound('Not found')
 * ApiError.conflict('Conflict')
 */
export default class ApiError extends Error {
  constructor(public status: number, public message: string) {
    super(message)
  }
  static badRequest = (message: string) => new ApiError(400, message)

  static unauthorized = (message: string) => new ApiError(401, message)

  static forbidden = (message: string) => new ApiError(403, message)

  static notFound = (message: string) => new ApiError(404, message)

  static conflict = (message: string) => new ApiError(409, message)
}
