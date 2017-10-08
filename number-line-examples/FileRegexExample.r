fileLines <- readLines("test.txt")
results <- grep("^[0-9]+$", fileLines, value = TRUE)
print (results)
