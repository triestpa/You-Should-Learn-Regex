package main

import (
    "fmt"
		"io/ioutil"
		"regexp"
)

func main() {
		testFile, err := ioutil.ReadFile("./test.txt")
		if err != nil { fmt.Print(err) }
    testString := string(testFile)
		var re = regexp.MustCompile(`(?m)^([0-9]+)$`)
		var results = re.FindAllString(testString, -1)
		fmt.Println(results)
}