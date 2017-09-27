const fs = require('fs')

const testFile = fs.readFileSync('./test.txt', 'utf8')
const regex = /^([0-9]+)$/gm
let results = testFile.match(regex)
console.log(results)