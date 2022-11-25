/**
 * @class CustomValidator
 * @classdesc class for validate some values
 * @method isContainOnlyLatinLettersAndNumbers
 * @description validate if the value contains only latin letters and numbers
 * @param {string} value - value to validate
 * @returns {boolean} true if the value contains only latin letters and numbers
 * @example
 * CustomValidator.isContainOnlyLatinLettersAndNumbers('test')
 * CustomValidator.isContainOnlyLatinLettersAndNumbers('test123')
 * @method isStartWithNumber
 * @description validate if the value starts with number
 * @param {string} value - value to validate
 * @returns {boolean} true if the value starts with number
 * @example
 * CustomValidator.isStartWithNumber('1test')
 * @method isContainOnlyDigits
 * @description validate if the value contains only digits
 * @param {string} value - value to validate
 * @returns {boolean} true if the value contains only digits
 * @example
 * CustomValidator.isContainOnlyDigits('123')
 */

class CustomValidator {
  isContainOnlyLatinLettersAndNumbers(value: string) {
    return /^[a-zA-Z0-9]+$/.test(value)
  }
  isStartWithNumber(value: string) {
    return /^[0-9]/.test(value)
  }
  isContainOnlyDigits(value: string) {
    return /^\d+$/.test(value)
  }
}

export default new CustomValidator()
