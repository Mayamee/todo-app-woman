export default class ApiError extends Error {
  constructor(public status: number, public message: string) {
    super()
    this.status = status
    this.message = message
  }
  static badRequest = (message: string) => new ApiError(400, message)

  static unauthorized = (message: string) => new ApiError(401, message)

  static forbidden = (message: string) => new ApiError(403, message)

  static notFound = (message: string) => new ApiError(404, message)

  static conflict = (message: string) => new ApiError(409, message)

  static internal = (message: string) => new ApiError(500, message)
}
