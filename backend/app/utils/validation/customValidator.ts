/**
 * Class for validate some values
 */
class CustomValidator {
  /**
   * Checks if the value contains only latin letters and numbers
   * @param {string} value - value to validate
   * @return {boolean} true if the value contains only latin letters and numbers
   * @example
   * CustomValidator.isContainOnlyLatinLettersAndNumbers('test')
   * CustomValidator.isContainOnlyLatinLettersAndNumbers('test123')
   */
  isContainOnlyLatinLettersAndNumbers(value: string): boolean {
    return /^[a-zA-Z0-9]+$/.test(value)
  }
  /**
   * Checks if the value starts with number
   * @param {string} value - value to validate
   * @return {boolean} true if the value starts with number
   * @example
   * CustomValidator.isStartWithNumber('1test')
   */
  isStartWithNumber(value: string): boolean {
    return /^[0-9]/.test(value)
  }
  /**
   * Checks if the value contains only digits
   * @param {string} value - value to validate
   * @return {boolean} true if the value contains only digits
   * @example
   * CustomValidator.isContainOnlyDigits('123')
   */
  isContainOnlyDigits(value: string): boolean {
    return /^\d+$/.test(value)
  }
}

export default new CustomValidator()
