function isValidEmail (input) {
  const regex = /^.[^@\s]+@.[^@\s]+\.\w{2,6}$/g;
  const result = regex.exec(input)
  return result ? true : false
}

console.log(isValidEmail(`test.test@gmail.com`))
console.log(isValidEmail(`test.test`))
console.log(isValidEmail(`gmail.com`))
console.log(isValidEmail(`this is a test@test.com`))
console.log(isValidEmail(`test.test@gmail.comtest.test@gmail.com`))