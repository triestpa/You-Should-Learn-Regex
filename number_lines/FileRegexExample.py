import re
test_file = open('./test.txt', 'r').read()
regex = re.compile(r'^([0-9]+)$', re.MULTILINE)
result = regex.findall(test_file)
print(result)

