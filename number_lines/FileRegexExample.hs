import Text.Regex.PCRE
import System.Environment

main = do
  fileContents <- readFile "test.txt"
  let stringResult = fileContents =~ "1" :: AllTextMatches [] String
  getAllTextMatches stringResult