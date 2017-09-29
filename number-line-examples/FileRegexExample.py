import re

with open('./test.txt', 'r') as f:
  test_string = f.read()
  regex = re.compile(r'^([0-9]+)$', re.MULTILINE)
  result = regex.findall(test_string)
  print(result)

