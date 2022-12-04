import bcrypt from 'bcrypt'
/**
 * @function hashPassword
 * @param {string} password - password to hash
 * @return {Promise<string>} hashed password
 * @example
 * hashPassword('test123').then((hashedPassword) => {
 * console.log(hashedPassword)
 * })
 */
export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)
  return hash
}
/**
 * @function comparePassword
 * @param {string} password - password to compare
 * @param {string} hash - hash to compare
 * @return {Promise<boolean>} true if password hash and provided hash are equal
 * @example
 * comparePassword("123", "b8dhffn5bf").then((result) => {
 *  console.log(result)
 * })
 */
export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
  const result = await bcrypt.compare(password, hash)
  return result
}
