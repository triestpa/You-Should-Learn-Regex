function isValidEmail (input) {
  const regex = /^.[^@\s]+@.[^@\s]+\.\w{2,6}$/g;
  const result = regex.exec(input)

  // If result is null, no match was found
  return result ? true : false
}

const tests = [ `test.test@gmail.com`, '', `test.test`, `gmail.com`, `this is a test@test.com`, `test.test@gmail.comtest.test@gmail.com`]
console.log(tests.map(isValidEmail))