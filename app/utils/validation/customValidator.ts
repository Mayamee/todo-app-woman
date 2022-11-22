class CustomValidator {
  isLatinLettersAndNumbers(value: string) {
    return /^[a-zA-Z0-9]+$/.test(value)
  }
	wontStartWithNumber(value: string) {
		return !/^[0-9]/.test(value)
	}
}

export default new CustomValidator()
