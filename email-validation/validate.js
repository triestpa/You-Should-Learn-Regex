function isValidEmail (input) {
  const regex = /^[^@\s]+@[^@\s]+\.\w{2,6}$/g;
  const result = regex.exec(input)

  // If result is null, no match was found
  return !!result
}

const tests = [
  `test.test@gmail.com`, // Valid
  '', // Invalid
  `test.test`, // Invalid
  '@invalid@test.com', // Invalid
  'invalid@@test.com', // Invalid
  `gmail.com`, // Invalid
  `this is a test@test.com`, // Invalid
  `test.test@gmail.comtest.test@gmail.com` // Invalid
]

console.log(tests.map(isValidEmail))
