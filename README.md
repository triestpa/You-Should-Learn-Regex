# You Should Learn Regex

Regex (regular expressions) is one of the most powerful, widely applicable, and sometimes intimidating techniques in software engineering.  From validating email addresses to performing complex code refactors, regular expressions have a wide range of uses and are an essential entry in any software engineers toolbox.

#### What is a regular expression?

A regular expression (or regex, or regexp) is a way to describe complex search patterns using sequences of characters.

The complexity of the specialized regex syntax, however, can make these expressions somewhat inaccessible.  For instance, here is a basic regex that describes any time in the 24-hour HH/MM format.

```
\b([01]?[0-9]|2[0-3]):([0-5]\d)\b
```

If this looks complex to you now, don't worry, by the time we finish this tutorial understanding the above example will be trivial.

### Learn once, write anywhere

Regular expressions can be used in virtually any programming language.  Beyond programming languages, a knowledge of regex is also very useful for interacting with the Unix shell, for quickly searching/refactoring code in your favorite text editor, and for a ton of other uses as well.

In this tutorial, I'll try to give an approachable introduction to regex syntax and usage in a variety of scenarios and languages.

This web application is my favorite tool for building, testing, and debugging regular expressions.  I highly recommend that you use it to test out the expressions that we'll cover in this tutorial.
[https://regex10-com]()

The source code for the examples in this tutorial can be found at the Github repository here - [https://github.com/triestpa/You-Should-Learn-Rege]()

## Match Any Number Line

We'll start with a very simple example - Match any line that only contains numbers.

```
^[0-9]+$
```

Let's walk through this piece-by-piece.

- `^` - Signifies the start of a line.
- `[0-9]` - Matches any digit between 0 and -
- `+` - Matches one or more instance of the preceding expression.
- `$` - Signifies the end of the line.

We could re-write this regex in pseudo-English as `[start of line][one or more digits][end of line]`.

Pretty simple right?

> In modern regex implementations, we can replace `[0-9]` with `\d`, which will do the same thing (match any digit).

This is quite easy (and consistent) to test in any number of languages.

We'll use the following input file as an example.
```
1234
abcde
12db2
5362

1
```

Our regular expression should match three lines - 1234, 5362, and 1.

The great thing about this expression (and regular expressions in general) is that it can be used in *virtually any programing language*.

To demonstrate we'll now quickly go through how to perform this simple regex search (+ a local text file read) in 15 of the most used programming languages - Javascript/Typescript, Python, Ruby, Haskell, Perl, PHP, Go, R, Java, Scala, Kotlin, Swift, Rust, C#, C++, and Bash.

Each script will read the "test" file, search it using our regex, and print the result(`'1234', '5362', '1'`) to the console.

#### Javascript / Node.js / Typescript
```javascript
const fs = require('fs')
const testFile = fs.readFileSync('test.txt', 'utf8')
const regex = /^([0-9]+)$/gm
let results = testFile.match(regex)
console.log(results)
```


#### Python
```python
import re

with open('test.txt', 'r') as f:
  test_string = f.read()
  regex = re.compile(r'^([0-9]+)$', re.MULTILINE)
  result = regex.findall(test_string)
  print(result)
```

#### R
```r
fileLines <- readLines("test.txt")
results <- grep("^[0-9]+$", fileLines, value = TRUE)
print (results)
```

#### Ruby
```ruby
File.open("test.txt", "rb") do |f|
    test_str = f.read
    re = /^[0-9]+$/m
    test_str.scan(re) do |match|
        puts match.to_s
    end
end
```

#### Haskell
```haskell
import Text.Regex.PCRE

main = do
  fileContents <- readFile "test.txt"
  let stringResult = fileContents =~ "^[0-9]+$" :: AllTextMatches [] String
  print (getAllTextMatches stringResult)
```

#### Perl
```perl
open my $fh, '<', 'test.txt' or die "Unable to open file $!";
read $fh, my $file_content, -s $fh;
close $fh;
my $regex = qr/^([0-9]+)$/mp;
my @matches = $file_content =~ /$regex/g;
print join(',', @matches);
```

#### PHP
```php
<?php
$myfile = fopen("test.txt", "r") or die("Unable to open file.");
$test_str = fread($myfile,filesize("test.txt"));
fclose($myfile);
$re = '/^[0-9]+$/m';
preg_match_all($re, $test_str, $matches, PREG_SET_ORDER, 0);
var_dump($matches);
?>
```

#### Go
```go
package main

import (
    "fmt"
    "io/ioutil"
    "regexp"
)

func main() {
    testFile, err := ioutil.ReadFile("test.txt")
    if err != nil { fmt.Print(err) }
    testString := string(testFile)
    var re = regexp.MustCompile(`(?m)^([0-9]+)$`)
    var results = re.FindAllString(testString, -1)
    fmt.Println(results)
}
```

#### Java
```java
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;

class FileRegexExample {
  public static void main(String[] args) {
    try {
      String content = new String(Files.readAllBytes(Paths.get("../test.txt")));
      Pattern pattern = Pattern.compile("^[0-9]+$", Pattern.MULTILINE);
      Matcher matcher = pattern.matcher(content);
      ArrayList<String> matchList = new ArrayList<String>();
      while (matcher.find()) {
        matchList.add(matcher.group());
      }

      System.out.println(matchList);
    } catch (IOException e) {
      e.printStackTrace();
    }
  }
}
```

#### Kotlin
```kotlin
import java.io.File
import kotlin.text.Regex
import kotlin.text.RegexOption

val file = File("test.txt")
var content:String = file.readText()
val regex = Regex("^[0-9]+$", RegexOption.MULTILINE)
val results = regex.findAll(content).map{ result -> result.value }.toList()
println(results)
```

#### Scala
```scala
import scala.io.Source
import scala.util.matching.Regex

object FileRegexExample {
  def main(args: Array[String]) {
    val fileContents = Source.fromFile("test.txt").getLines.mkString("\n")
    val pattern = "(?m)^[0-9]+$".r
    val results = (pattern findAllIn fileContents).mkString(",")
    println(results)
  }
}
```

#### Swift
```swift
import Cocoa
do {
    let fileText = try String(contentsOfFile: "test.txt", encoding: String.Encoding.utf8)
    let regex = try! NSRegularExpression(pattern: "^[0-9]+$", options: [ .anchorsMatchLines ])
    let results = regex.matches(in: fileText, options: [], range: NSRange(location: 0, length: fileText.characters.count))
    let matches = results.map { String(fileText[Range($0.range, in: fileText)!]) }
    print(matches)
} catch {
    print(error)
}
```

#### Rust
```rust
extern crate regex;
use std::fs::File;
use std::io::prelude::*;
use regex::Regex;

fn main() {
  let mut f = File::open("test.txt").expect("file not found");
  let mut test_str = String::new();
  f.read_to_string(&mut test_str).expect("something went wrong reading the file");

  let regex = match Regex::new(r"(?m)^([0-9]+)$") {
    Ok(r) => r,
    Err(e) => {
      println!("Could not compile regex: {}", e);
      return;
    }
  };

  let result = regex.find_iter(&test_str);
  for mat in result {
    println!("{}", &test_str[mat.start()..mat.end()]);
  }
}
```

#### C#
```cs
using System;
using System.IO;
using System.Text;
using System.Text.RegularExpressions;
using System.Linq;

namespace RegexExample
{
    class FileRegexExample
    {
        static void Main()
        {
            string text = File.ReadAllText(@"../test.txt", Encoding.UTF8);
            Console.WriteLine(text);
            Regex regex = new Regex("^[0-9]+$", RegexOptions.Multiline);
            MatchCollection mc = regex.Matches(text);
            var matches = mc.OfType<Match>().Select(m => m.Value).ToArray();
            Console.WriteLine(string.Join(" ", matches));
        }
    }
}
```

#### C++
```c++
#include <string>
#include <fstream>
#include <iostream>
#include <sstream>
#include <regex>
using namespace std;

int main () {
  ifstream t("test.txt");
  stringstream buffer;
  buffer << t.rdbuf();
  string testString = buffer.str();

  regex numberLineRegex("(^|\n)([0-9]+)($|\n)");
  sregex_iterator it(testString.begin(), testString.end(), numberLineRegex);
  sregex_iterator it_end;

  while(it != it_end) {
    cout << it -> str();
    ++it;
  }
}
```

#### Bash
```bash
#! bin/bash
cat test.txt | grep -E "^[0-9]+$"
```


Writing out the same regex operation in fifteen languages was a fun exercise, but we'll be mostly sticking with Javascript and Python for the rest of the tutorial since these languages (in my opinion) tend to yield the clearest, most readable implementations.

## Year Matching

Let's go through another simple example - matching any valid year in the 20th or 21st centuries.

```
\b(19|20)\d{2}\b
```

This should be fairly comprehensible given what we've learned so far.

We're starting and ending this regex with `\b` instead of `^` and `$`.  `\b` represents a *word boundary*, or a space between two words.  This will allow us to match years within the text that are not on their own lines, which is of course very useful for search through, say, paragraph text.

- `\b` - Word boundary
- `(19|20)` - Matches either '19' or '20' using the OR ('|') operand.
- `\d{2}` - Two digits, same as `[0-9]{2}`
- `\b` - Word boundary

> Note that `\b` differs from `\s`, the code for a whitespace character.  `\b` searches for a place where a word character is not followed or preceded by another word-character, so it is essentially searching for the *absence* of a word character, whereas `\s` is searching explicitly for a space character.  `\b` is especially appropriate for cases where we want to match a specific sequence/word, but not the whitespace before or after it.

#### Real-World Example - Count Year Occurrences

We can use this expression in a Python script to find how many times each year in the 20th or 21st century is mentioned in a historical Wikipedia article.

```python
import re
import urllib.request
import operator

# Download wiki page
url = "https://en.wikipedia.org/wiki/Diplomatic_history_of_World_War_II"
html = urllib.request.urlopen(url).read()

# Find all mentioned years in the 20th or 21st century
regex = r"\b(?:19|20)\d{2}\b"
matches = re.findall(regex, str(html))

# Form a dict of the number of occurrences of each year
year_counts = dict((year, matches.count(year)) for year in set(matches))

# Print the dict sorted in descending order
for year in sorted(year_counts, key=year_counts.get, reverse=True):
  print(year, year_counts[year])
```

The above script will result in output with each year, and the number of times it is mentioned.
```
1941 137
1943 80
1940 76
1945 73
1939 71
...
```

## Time Matching

Now we'll define a regex expression to match any time in the 24-hour format (say, 16:59).

```
\b([01]?[0-9]|2[0-3]):([0-5]\d)\b
```

- `\b` - Word boundary
- `[01]` - 0 or 1
- `?` - Signifies that the preceding pattern is optional.
- `[0-9]` - any number between 0 and 9
- `|` - `OR` operand
- `2[0-3]` - 2, followed by any number between 0 and 3 (i.e. 20-23)
- `:` - Matches the `:` character
- `[0-5]` - Any number between 0 and 5
- `\d` - Any number between 0 and 9 (same as `[0-9]`)
- `\b` - Word boundary

#### Capture Groups

You might have noticed something new in the above pattern - we're wrapping the hour and minute capture segments in parenthesis `( ... )`.  This allows us to define each part of the pattern as a **capture group**.

Capture groups are one of the most powerful features of Regex since they allow us individually extract and transforms parts of each matched pattern.

#### Real-World Example - Time Parsing

For example, in the above 24-hour pattern, we've defined two capture groups - one for the hour and one for the minute.

We can extract these capture groups easily.

For instance, here's how we could use Javascript to parse a 24-hour formatted time into hours and minutes.

```javascript
const regex = /\b([01]?[0-9]|2[0-3]):([0-5]\d)/
const str = `The current time is 16:24`
const result = regex.exec(str)
console.log(`The current hour is ${result[1]}`)
console.log(`The current minute is ${result[2]}`)
```

> The zeroth capture group is always the entire matched expression.

The above script will output -

```
The current hour is 16
The current minute is 24
```

## Date Matching

Now let's match a `DAY/MONTH/YEAR` style date pattern.

```
\b(0?[1-9]|[12]\d|3[01])([\/\-])(0?[1-9]|1[012])\2(\d{4})
```

This one is a bit longer but should look pretty similar to what we've covered already.

- `(0?[1-9]|[12]\d|3[01])` - Match any number between 1 and 31
- `([\/\-])` - Match the seperator "/" or "-"
- `(0?[1-9]|1[012])` - Match any number between 1 and 12
- `\2` - Matches the second capture group (the seperator)
- `\d{4}` - Match any 4 digit number (0000 - 9999)

The only new concept here is that we're using `\2` to match the second capture group, which is the divider ("/" or "-").  This enables us to avoid repeating our pattern matching specification, and will also require that the dividers are consistent (if the first divider is a "/", then the second must be as well).

#### Capture Group Substitution

Using capture groups, we can dynamically reorganize and transform our string input.

The standard way to refer to capture groups is to use the `$` or `\` symbol, along with the index of the capture group (remember that the zeroth element is the full captured text).

#### Real-World Example - Date Format Transformation

Let's imagine that we were tasked with converting a collection of documents from using the international date format style (`DAY/MONTH/YEAR`) to the American style (`MONTH/DAY/YEAR`)

We could use the above regular expression with a replacement pattern - `$3$2$1$2$4` or `\3\2\1\2\4`.

Let's break our capture groups down.
- $1 - First capture group: the day digits.
- $2 - Second capture group: the divider.
- $3 - Third capture group: the month digits.
- $4 - Fourth capture group: the year digits.

Our replacement pattern (`\3\2\1\2\4`) will simply swap the month and day content in the expression.

#### Javascript

Here's how we could do this transformation in Javascript -

```javascript
const regex = /\b(0?[1-9]|[12]\d|3[01])([ \/\-])(0?[1-9]|1[012])\2(\d{4})/
const str = `Today's date is 18/09/2017`
const subst = `$3$2$1$2$4`
const result = str.replace(regex, subst)
console.log(result)
```

The above script will print "Today's date is 09/18/2017" to the console.

Here's how the same script would look in Python -

```python
import re
regex = r'\b(0?[1-9]|[12]\d|3[01])([ \/\-])(0?[1-9]|1[012])\2(\d{4})'
test_str = "Today's date is 18/09/2017"
subst = r'\3\2\1\2\4'
result = re.sub(regex, subst, test_str)
print(result)
```

## Email Validation

```
^.[^@\s]+@.[^@\s]+\.\w{2,6}$
```

This is an (overly simple) regular expression to match any email address.

- `^` - Start of line
- `.` - Match any character
- `[^@\s]` - Except for `@` and whitespace
- `+` - 1+ times
- `@` - Match the '@' symbol
- `.[^@\s]+` - Match any character (except for "@" and whitespace), 1+ times
- `\.` - Match the '.' character.
- `\w{2,6}` - Match any word character (letter, digit, or underscore), 2-6 times
- `$` - End of line

#### Real-World Example - Validate Email
As an example, let's say we wanted to create a simple Javascript function to check if an input is a valid email.

```javascript
function isValidEmail (input) {
  const regex = /^.[^@\s]+@.[^@\s]+\.\w{2,6}$/g;
  const result = regex.exec(input)
  return result ? true : false
}

const tests = [`test.test@gmail.com`, '', `test.test`, `gmail.com`, `this is a test@test.com`, `test.test@gmail.comtest.test@gmail.com`]
console.log(tests.map(isValidEmail))
```

The output of this script should be `[ true, false, false, false, false, false ]`.

#### Full Email Regex

This is a very simple example which ignores lots of email-validity edge cases.  I really don't recommend using the above expression in your applications; it would be best to instead use a reputable email-validation library or to track down a complete email validation regex.

For instance, here's a more advanced expression from [emailregex.com](http://emailregex.com/) which matches 99% of RFC 5322 compliant email addresses.

```
(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])
```

Yeah, we're not going to walk through that one.

## Code Comment Pattern Matching

One of the most useful ad-hoc uses of regular expressions can be for quickly refactoring code.  Most code editors support regex-based find/replace operations.  A well-formed regex substitution can turn a tedious 30-minute busywork job into a beautiful single-expression piece of regex refactor wizardry.

Instead of writing scripts to perform these operations, try doing them natively in your text editor of choice.  Nearly every text editor supports regex based find-and-replace.

Here are a few guides for popular editors.

Regex Substitution in Sublime - [http://docs.sublimetext.info/en/latest/search_and_replace/search_and_replace_overview.html#using-regular-expressions-in-sublime-text]()

Regex Substitution in Vim - [http://vimregex.com/#backreferences]()

Regex Substitution in VSCode - [https://code.visualstudio.com/docs/editor/codebasics#_advanced-search-options]()

Regex Substitution in Emac - [https://www.gnu.org/software/emacs/manual/html_node/emacs/Regexp-Replace.html]()


#### Extracting Single Line CSS Comments

What if we wanted to find all of the single-line comments within a CSS file?

CSS comments come in the form `/* Comment Here */`

To capture any *single-line* CSS comment, we can use the following expression.

```
(\/\*+)(.*)(\*+\/)
```

There are a whole lot of `*` symbols here, so let's break it down.

- `\/` - Match `/` symbol (we have to use the `\` escape character)
- `\*+` - Match one or more `*` symbols (again, we have to escape the `*` character with `\`).
- `(.*)` - Match any character (besides a newline `\n`), any number of times
- `\*+` - Match one or more `*` characters
- `\/` - Match closing `/` symbol.

Note that we have defined three capture groups in the above expression: the opening characters (`(\/\*+)`), the comment contents (`(.*)`), and the closing characters (`(\*+\/)`).

#### Real-World Example - Convert Single-Line Comments to Multi-Line Comments

We could use this expression to turn each single-line comment into a multi-line comment by performing the following substitution.

```
$1\n$2\n$3
```

Here, we are simply adding a newline `\n` between each capture group.

Try performing this substitution on a file with the following contents.

```css
/* Single Line Comment */
body {
  background-color: pink;
}

/*
 Multiline Comment
*/
h1 {
  font-size: 2rem;
}

/* Another Single Line Comment */
h2 {
  font-size: 1rem;
}
```

The result of the substitution will be the same file, but with each single-line comment converted to a multi-line comment.

```css
/*
 Single Line Comment
*/
body {
  background-color: pink;
}

/*
 Multiline Comment
*/
h1 {
  font-size: 2rem;
}

/*
 Another Single Line Comment
*/
h2 {
  font-size: 1rem;
}
```

#### Real-World Example - Standardize CSS Comment Openings

Let's say we have a big messy CSS file that was written by a few different people.  In this file, some of the comments start with `/*`, some with `/**`, and some with `/*****`.

Let's write a regex substitution to standardize all of the single-line CSS comments to use `/*`.

In order to do this, we'll extend our expression to only match comments with *two or more* starting asterisks.

```
(\/\*{2,})(.*)(\*+\/)
```

This expression very similar to the original.  The main difference is that at the beginning we've replaced `\*+` with `\*{2,}`.  The `{2,}` syntax signifies "two or more" instances of `*`.

To standardize the opening of each comment we can pass the following substitution.

```
/*$2$3
```

We can run this substitution on the following test CSS file.
```css
/** Double Asterisk Comment */
body {
  background-color: pink;
}

/* Single Asterisk Comment */
h1 {
  font-size: 2rem;
}

/***** Many Asterisk Comment */
h2 {
  font-size: 1rem;
}
```

The output will be -
```css
/* Double Asterisk Comment */
body {
  background-color: pink;
}

/* Single Asterisk Comment */
h1 {
  font-size: 2rem;
}

/* Many Asterisk Comment */
h2 {
  font-size: 1rem;
}
```

## URL Matching

Another highly useful regex recipe is matching URLs in text.

Here an example URL matching expression from Stack Overflow.

https://stackoverflow.com/questions/3809401/what-is-a-good-regular-expression-to-match-a-url

```
(https?:\/\/)(www\.)?(?<domain>[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6})(?<path>\/[-a-zA-Z0-9@:%_\/+.~#?&=]*)?
```

- `(https?:\/\/)?` - Match http or https (optional)
- `(www\.)?` - Optional "www" prefix
- `(?<domain>[-a-zA-Z0-9@:%._\+~#=]{2,256}` - Match a valid domain name
- `\.[a-z]{2,6})` - Match a domain extension extension (i.e. ".com" or ".org")
- `(?<path>\/[-a-zA-Z0-9@:%_\/+.~#?&=]*)?` - Match URL path (`/posts`), query string (`?limit=1`), and file extension (`.html`), all optional.

#### Named capture groups

You'll notice here that some of the capture groups now begin with a `?<name>` identifier.  This is the syntax for a *named capture group*, which makes the data extraction easier and more clear.

#### Real-World Example - Parse Domain Names From URLs on A Web Page

Here's how we could use named capture groups to extract the domain of each URL from a raw webpage HTML string using Python.

```python
import re
import urllib.request

html = str(urllib.request.urlopen("https://moz.com/top500").read())
regex = r"(https?:\/\/)(www\.)?(?P<domain>[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6})(?P<path>\/[-a-zA-Z0-9@:%_\/+.~#?&=]*)?"
matches = re.finditer(regex, html)

for match in matches:
  print(match.group('domain'))
```

The script will print out each domain name it finds in the raw webpage HTML content.
```
...
facebook.com
twitter.com
google.com
youtube.com
linkedin.com
wordpress.org
instagram.com
pinterest.com
wikipedia.org
wordpress.com
...
```

## Command Line Usage

Regular expressions are supported by many Unix command line utilities, here we'll walk through how to use them with `grep` to find specific files, and with `sed` to replace text file content in-place.

#### Real-World Example - Image File Matching With `grep`

We'll define another basic regular expression, this time to match image files.

```
^.+\.(?i)(png|jpg|jpeg|gif|webp)$
```

- `^` - Start of line.
- `.+` - Match any character (letters, digits, symbols), expect for "\n" (new line), 1+ times.
- `\.` - Match the '.' character.
- `(?i)` - Signifies that the next sequence is case-insensitive.
- `(png|jpg|jpeg|gif|webp)` - Match common image file extensions
- `$` - End of line


Here's how you could list all of the image files in your `Downloads` directory.

```bash
ls ~/Downloads | grep -E '^.+\.(?i)(png|jpg|jpeg|gif|webp)$'
```

- `ls ~/Downloads` - List the files in your downloads directory
- `|` - Pipe the output to the next command
- `grep -E` - Filter the input with regular expression

#### Real-World Example - Email Substitution With `sed`

Another good use of regular expressions in bash commands could be redacting emails within a text file.

This can be done quite using the `sed` command, along with a modified version of our email regex from earlier.

```bash
sed -E -i 's/^(.*?\s|)[^@]+@[^\s]+/\1\{redacted\}/g' test.txt
```

- `sed` - The Unix "stream editor" utility, which allows for powerful text file transformations.
- `-E` - Use extended regex pattern matching
- `-i` - Replace the file stream in-place
- `'s/^(.*?\s|)` - Wrap the beginning of the line in a capture group
- `[^@]+@[^\s]+` - Simplified version of our email regex.
- `/\1\{redacted\}/g'` - Replace each email address with `{redacted}`.
- `test.txt` - Perform the operation on the `test.txt` file.

We can run the above substitution command on a sample `test.txt` file.

```
My email is patrick.triest@gmail.com
```

Once the command has finished, the email will be redacted from the file.

```
My email is {redacted}
```

> Warning - This command will automatically remove all email addresses from any `test.txt` that you pass it, so be careful where/when you run it, since *this operation cannot be reversed*.  To preview the results, instead of writing them in-place, simply omit the `-i` flag.

> Note - While the above command should work on most Linux distributions, macOS uses the BSD implementation is `sed`, which is more limited in its supported regex syntax.  To use `sed` on macOS with decent regex support, I would recommend installing the GNU implementation of `sed` with `brew install gnu-sed`, and then using `gsed` from the command line instead of `sed`.

## When Not To Use Regex

Ok, so clearly regex is a powerful, flexible tool capable of nearly infinite text searching, substitution, and validation use cases.

Are there times when you should avoid writing your own regex expressions? YES!

#### Language Parsing

Parsing languages, even specialized machine-readable language syntaxes such as HTML, XML, or JSON, can be a real pain using regex expressions.

Writing your own regex expression for this purpose is likely to result in eventual (or immediate) disaster when an edge case or minor syntax error in the data source causes the expression to fail.

Battle-hardened parsers are available for virtually all machine-readable languages - I strongly recommend that you use one of them instead of attempting to write your own.

#### Security Centric Uses

It may seem tempting to use regular expressions to filter user input (such as from a web form), to prevent hackers from sending malicious commands (such as SQL injections) to your application.

Using a custom regex expression here is unwise since it is very difficult to cover every potential attack vector or malicious command.  For instance, hackers can use [alternative character encodings to get around naively programmed input blacklist filters](http://www.cgisecurity.com/lib/URLEmbeddedAttacks.html).

This is another instance where I would strongly recommend using the well tested open-source options available instead of writing your own.

#### For Problems That Don't Require Regex

Regex is an incredibly useful tool, but that doesn't mean you should use it everywhere.

If there is an alternative solution to a problem, which is simpler and/or does not require the use of regular expressions, please do not use regex just to feel clever.  While regex is great, it is also one of the least readable programming tools, and one that is very prone to edge cases and bugs.

Overusing regex is a great way to make your co-workers (and anyone else who needs to work with your code) very angry at you.

## Conclusion

I hope that this has been a useful introduction to the many uses of regular expressions.

There still are lots of regex use cases that we have not covered.  For instance, [regex can be used in PostgreSQL queries](https://www.postgresql.org/docs/9.5/static/functions-matching.html) to dynamically search for text patterns within a database.

We have also left lots of powerful regex syntax features uncovered, such as [lookahead, lookbehind](https://www.regular-expressions.info/lookaround.html), [atomic groups](https://www.regular-expressions.info/atomic.html), [recursion](https://www.regular-expressions.info/recurse.html), and [subroutines](https://www.regular-expressions.info/subroutine.html).

To improve your regex skills and to learn more about these features, I would recommend the following resources.
Learn Regex The Easy Way (text reference resource) - https://github.com/zeeshanu/learn-regex
Regex101 (interactive regex composer and tester) - https://regex101.com/
HackerRank Regex Course - https://www.hackerrank.com/domains/regex/re-introduction

The source code for the examples in this tutorial can be found at the Github repository here - https://github.com/triestpa/You-Should-Learn-Regex

Feel free to comment below with any suggestions, or issues that you noticed within this tutorial.
