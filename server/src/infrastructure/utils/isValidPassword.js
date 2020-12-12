const {
  MINIMUM_PASSWORD_DIGITS,
  MINIMUM_PASSWORD_LENGTH,
  MINIMUM_PASSWORD_LOWERCASE,
  MINIMUM_PASSWORD_UPPERCASE,
  MAXIMUM_PASSWORD_LENGTH,
} = require('../../config/app.config');

const isValidPassword = (password) {
  if (
    !password ||
    typeof password !== 'string' ||
    password.length < MINIMUM_PASSWORD_LENGTH ||
    password.length > MAXIMUM_PASSWORD_LENGTH
  ) {
    return false;
  }
  let lowerCaseCount = 0;
  let upperCaseCount = 0;
  let digitCount = 0;

  for (let char of password) {
    if () {

    }
  }

}
