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
