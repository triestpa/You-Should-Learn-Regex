const fs = require('fs')
const regex = /(\/\*+)(.*)(\*+\/)/g
const str = fs.readFileSync('./test.css', 'utf8')
const subst = `$1\n$2\n$3`
const result = str.replace(regex, subst)
console.log(result)