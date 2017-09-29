# You Should Learn Regex

## Hook + Intro

pattern matching

example of complicated regex

This is a skill that has a much more broad usage than any specific framework or library.

Regex is like a hammer: it's powerful, widely applicable, and completely essential in any software engineer's toolbox.

### Learn once, write anywhere.

Regex can be used is virtually any programming language.

We'll be providing a variety of examples in {{ list languages }}

The reason that we'll be using so many languages is to make the point that Regex is used similarly pretty much anywhere!

Editors (VSCode, Vim, Sublime, Emacs)
Command line

### Useful resources
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
https://regex101.com

### 0 - Simplest Examples

#### 0.0 - Match Any Number Line

We'll start with a very simple example - Match any line that only contains numbers.

```
^[0-9]+$
```

Let's walk through this piece-by-piece.

1. `^` - Signifies the start of a line.
2. `[0-9]` - Matches any digit between 0 and 9.
3. `+` - Matches one or more instance of the preceding expression.
4. `$` - Signifies the end of the line.

We could re-write this regex in psuedo-English as `[start of line][one or more digits][end of line]`.

Pretty simple right?

> In modern regex implementations, we can replace `[0-9]` with `\d`, which will do the same thing (match any digit).

This is quite easy (and consistant) to test in any number of languages.

We'll use the following input file as an example.
```
1234
abcde
12db2
5362

1
```

Our regular expression should match three lines - 1234, 5362, and 1.

For instance, here's the implementation in Javascript, with Node.js, reading the input data from a local file - `test.txt`.

###### Javascript
```javascript
const fs = require('fs')

const testFile = fs.readFileSync('test.txt', 'utf8')
const regex = /^([0-9]+)$/gm
let results = testFile.match(regex)
console.log(results)
```

The result will be `[ '1234', '5362', '1' ]`.

Here it is in Python

###### Python
```python
import re

with open('test.txt', 'r') as f:
  test_string = f.read()
  regex = re.compile(r'^([0-9]+)$', re.MULTILINE)
  result = regex.findall(test_string)
  print(result)
```

Notice how, despite being in completely different languages, the Javascript and Python code for this operation is nearly identical.

###### Ruby
In Ruby
```ruby
File.open("test.txt", "rb") do |f|
    test_str = f.read
    re = /^[0-9]+$/m
    test_str.scan(re) do |match|
        puts match.to_s
    end
end
```

How about in Haskell?

###### Haskell
```haskell
import Text.Regex.PCRE

main = do
  fileContents <- readFile "test.txt"
  let stringResult = fileContents =~ "^[0-9]+$" :: AllTextMatches [] String
  print (getAllTextMatches stringResult)
```

###### Perl
```perl
open my $fh, '<', 'test.txt' or die "Unable to open file $!";
read $fh, my $file_content, -s $fh;
close $fh;
my $regex = qr/^([0-9]+)$/mp;
my @matches = $file_content =~ /$regex/g;
print join(',', @matches);
```

###### PHP
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

###### Go
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

###### Java
```java
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

class FileRegexExample {
  public static void main(String[] args) {
    StringBuilder sb = new StringBuilder();
    try(Stream<String> stream = Files.lines(Paths.get("test.txt"))) {
      	stream.forEach((String line) -> {
          sb.append(line);
          sb.append(System.lineSeparator());
        });
    } catch (IOException e) {
			e.printStackTrace();
		}

    String testString = sb.toString();
    String regex = "^[0-9]+$";
    Pattern pattern = Pattern.compile(regex, Pattern.MULTILINE);
    Matcher matcher = pattern.matcher(testString);

    List<String> matchList = new ArrayList<String>();
    while (matcher.find()) {
      matchList.add(matcher.group());
    }

    System.out.println(matchList);
  }
}
```

###### Rust
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

###### C++
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


Writting out the same regex operation in fourteen languages is a fun exercise, but we'll be mostly sticking with Javascript and Python for the rest of the tutorial since they tend to have the shortest, simplest implementations.


### Email Validation

Ok, let's do something slightly more useful.

#### Minimal Validation Expression

```
^.[^@\s]+@.[^@\s]+\.\w{2,6}$
```

This is a simplistic regex to match any email address.

1. `^` - Start of line
2. `.[^@\s]+` - Match any character (except for "@", and whitespace) 1+ times
3. `@` - Match the '@' symbol
4. `.[^@\s]+` - Match any character (except for "@" and whitespace), 1+ times
5. `\.` - Match the '.' character.
6. `\w{2,6}` - Match any word character (letter, digit, or underscore), 2-6 times
7. `$` - End of line

Hence, we could write this expresion as -
[start of line][1+ characters][@ symbol][1+ characters][period symbol][2-6 characters][end of line]

As an example, let's say we wanted to create a simple Javascript function to check if the input is a valid email.

```javascript
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
```

The output of this script should be `true false false false false`.

#### Full Email Regex

This is a very simplistic example which ignores lots of email-validity edge cases.  I don't reccomend using this in you applications, it would be best to instead use a reputable email-validation library, or to track down a more complete email validation regex.

For instance, here's a more advanced expression from [emailregex.com](http://emailregex.com/) which matches 99% of RFC 5322 compliant email addresses.

```
(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])
```

Yeah, we're not going to walk through that one.

### Datetime Matching

#### 20th or 21st Century Year

Let's go through another simple example - any valid year in the 20th or 21st centuries.

```
\b(19|20)\d{2}\b
```

This should be pretty comprehensible given what we've learned so far.

Note that we're starting and ending this regex with `\b` instead of `^` and `$`.  `\b` represents a *word boundry*, or a space between two words.  This will allow us to match years that are not on their own lines, which is of course very useful for search through, say, paragraph text.

1. `\b` - Word boundary
2. `(19|20)` - Matches either '19' or '20' using the OR ('|') operand.
3. `\d{2}` - Two digits, same as `[0-9]{2}`
4. `\b` - Word boundary

> Note that `\b` differs from `\s`, the code for a whitespace character.  `\b` searches for a place where a word character is is not followed or preceded by another word-character, so it is essentially searching for the *absense* of a word character, whereas `\s` is searching explicitly for a space character.  This is especially appropratiate for cases (such as this) where we want to match a specific sequence, but not the whitespace before or after it.

As an example, we can use this expression in a Python script tp find how many times each year (in the 20th or 21st century) is mentioned in the wikipedia article on WWII.

```python
import re
import urllib
import operator
from bs4 import BeautifulSoup

def download_wwii_wiki():
  url = "https://en.wikipedia.org/wiki/Diplomatic_history_of_World_War_II"
  html = urllib.request.urlopen(url).read()
  soup = BeautifulSoup(html)
  count_years(soup.get_text())

def count_years(text):
  # Find all mentioned years in the 20th or 21st century
  regex = r"\b(?:19|20)\d{2}\b"
  matches = re.findall(regex, text)

  # Form a dict of the number of occurrences of each year
  year_counts = dict((year, matches.count(year)) for year in set(matches))

  # Print the dict sorted in descending order
  for year in sorted(year_counts, key=year_counts.get, reverse=True):
    print(year, year_counts[year])

download_wwii_wiki()
```

The above script will result in output like this -
```
1941 112
1945 81
1940 66
1939 59
1943 52
1944 49
...
1954 1
```

#### 24-Hour Time Format

Now we'll define a regex expression to match any time in the 24 hour format (say, 16:59).

```
\b([01]?[0-9]|2[0-3]):([0-5]\d)\b
```

1. `\b` - Word boundary
2. `[01]` - 0 or 1
3. `?` - Signifies that the preceding pattern is optional.
4. `[0-9]` - any number between 0 and 9
5. `|` - OR
6. `2[0-3]` - 2, followed by any number between 0 and 3
7. `:` - Matches the `:` character
8. `[0-5]` - Any number between 0 and 5
9. `\d` - Any number between 0 and 9 (same as `[0-9]`)

#### Capture Groups

You might have noticed something different about the above pattern - we're wrapping the hour and minute capture segments in parenthesis (`( ... )`).  This allows us to define each part of the pattern as a *capture group*.

Capture groups are one of the most powerful features of Regex, since they allow us individually extract and transforms parts of each matched pattern.

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

#### DD/MM/YYYY Matching

Let's stay on our date-time matching path, and make it more interesting by matching an entire `DAY/MONTH/YEAR` style pattern.

```
\b(0?[1-9]|[12]\d|3[01])([ \/\-])(0?[1-9]|1[012])\2(\d{4})
```

This one is a bit longer, but should look pretty similar to what we've covered already.

1. `(0?[1-9]|[12]\d|3[01])` - Match any number between 1 and 31
2. `([ \/\-])` - Match the seperator: "/" or "-"
3. `(0?[1-9]|1[012])` - Match any number between 1 and 12
4. `\2` - Matches the second capture group (the seperator)
5. `\d{4}` - Match any 4 digit number (0000 - 9999)

Ok, pretty straightforward based on what we've already done.

The only new concept here is that we're using `\2` to match the second capture group, which is the divider ("/" or "-").  This enables us avoid repeating our pattern matching specification, and will also require that the dividers are consistant (if the first divider is a "/", then the second must be as well).

#### Capture Group Substitution

We can reorganize and transform our string input using capture groups.

The standard way to refer to capture groups is to use the `$` symbol, along with the index of the capture group (remember that the zeroth element is the full captured text).

For instance, if we wanted to change the format of the data to be `MONTH/DAY/YEAR` instead of `DAY/MONTH/YEAR`, we could assign a replacement pattern - `$3$2$1$2$4`.

Let's break this down.
$1 - First capture group: the day digits.
$2 - Second capture group: the divider.
$3 - Third capture group: the month digits.
$4 - Fourth capture group: the year.

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

#### Python

Some languages use a different syntax for the capture group matching/replacement.

For instance, here's how the same script would look in Python, using `\x` instead of `$x`.

```python
import re
regex = r'\b(0?[1-9]|[12]\d|3[01])([ \/\-])(0?[1-9]|1[012])\2(\d{4})'
test_str = "Today's date is 18/09/2017"
subst = r'\3\2\1\2\4'
result = re.sub(regex, subst, test_str)
print(result)
```

### Code Comment Pattern Matching

One of the most useful ad-hoc usages of regular expressions can be for quickly refactoring code.  Most code editors support regex-based find/replace operations.  A well-formed regex substituion can turn a tedious 30-minute refactor into a single-expression piece of wizardy.

For instance, what if we want to find all of the comments with a CSS file.

CSS comments come in the form `/* Comment Here */`

> We're choosing CSS comments here since it has the one of the simplest comment syntaxes: it only allows the near-universal `/* ... */` syntax for multi-line and single-line comments, without the `//`, `#`, `---`, , `<!--`, or `'''` style alternatives found in other languages.  This base expression should be relatively easy to extend with OR operands (`|`) for use with other languages.

#### Single Line CSS Comments

To capture any *single-line* CSS comment, we can use the following expression.

```
(\/\*+)(.*)(\*+\/)
```

There are a bunch of `*` symbols here, so let's break it down.

2. `\/` - Match `/` symbol (we have to use the `\` escape character)
3. `\*+` - Match one or more `*` symbols (again, we have to escape the `*` with `\`).
4. `(.*)` - Match any character (besides a new line), any number of times
5. `\*+` - Match one or more `*` characters
6. `\/` - Match closing `/` symbol.

#### Convert Single-Line Comments to Multi-Line Comments

We could use this expression to turn each single-line comment into a multi-line comment by performing the following subsitution.

```
$1\n$2\n$3
```

Here, we are simply adding a newline `\n` between each capture group.

Here's how it might look in Javascript.

```javascript
const fs = require('fs')
const regex = /(\/\*+)(.*)(\*+\/)/g
const str = fs.readFileSync('./test.css', 'utf8')
const subst = `$1\n$2\n$3`
const result = str.replace(regex, subst)
console.log(result)
```

If `test.css` has the following contents

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

Then the script will output
```css
/**
 Double Asterisk Comment
*/
body {
  background-color: pink;
}

/*
 Single Asterisk Comment
*/
h1 {
  font-size: 2rem;
}

/*****
 Many Asterisk Comment
*/
h2 {
  font-size: 1rem;
}
```


#### Standardize CSS Comment Openings

Let's say we have a big CSS file with some single-line comments starting with `/*`, some with `/**`, and some with `/*****`.

Let's write a regex substituion to standardize all of the single-line comments to use `/*`.

In order to do this, we'll extend our expression to only match comments with *two or more* starting asterisks.

```
(\/\*{2,})(.*)(\*+\/)
```

This expression very similar to the original.  The largest difference is that at the begining we've replaced `\*+` with `\*{2,}`.  The `{2,}` syntax signifies "Two or more" instances of `*`.

Note that we have defined three capture groups in the above expression, for the opening characters (`(\/\*{2,})`), the comment contents (`(.*)`), and the closing characters (`(\*+\/)`).

To standardize the opening of each comment we can pass the following substituion.

```
/*$2$3
```

Try out this substitution on the following file using your favorite test editor.

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

##### Usage Within Editors

Regex in Sublime - http://docs.sublimetext.info/en/latest/search_and_replace/search_and_replace_overview.html#using-regular-expressions-in-sublime-text

Regex in Vim - http://vimregex.com/#backreferences

Regex in VSCode - https://code.visualstudio.com/docs/editor/codebasics#_advanced-search-options

Regex in emacs - https://www.gnu.org/software/emacs/manual/html_node/emacs/Regexp-Replace.html

#### 5 - URL Matching

##### 5.0 - Match Any URL

// https://stackoverflow.com/questions/3809401/what-is-a-good-regular-expression-to-match-a-url
(https?:\/\/)(www\.)?(?<domain>[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6})(?<path>\/[-a-zA-Z0-9@:%_\/+.~#?&=]*)?

1. `(https?:\/\/)?` - Match http or https (optional)
2. `(www\.)?` - Optional "www" prefix
3. `(?<domain>[-a-zA-Z0-9@:%._\+~#=]{2,256}` - Match a valid domain name
4. `\.[a-z]{2,6})` - Match a domain extension extension (i.e. ".com" or ".org")
5. `(?<path>\/[-a-zA-Z0-9@:%_\/+.~#?&=]*)?` - Match URL path (`/posts`), query string (`?limit=1`), and file extension (`.html`), all optional.

###### Named capture groups

##### Extract URL Data

##### Scrape Webpage For Links


### Command Line Usage

#### Image File Matching

Now we'll define another basic regular expression, this time to match image files.

```
^.+\.(?i)(png|jpg|jpeg|gif|webp)$
```

1. `^` - Start of line.
2. `.` - Match any character (letters, digits, symbols), expect for "\n" (new line).
3. `+` - 1+ times.
4. `\.` - Match the '.' character.  We have to use the escape character `\`, since `.` on it's own symbolizes any character.
5. `(?i)` - Signifies that the next sequence is case-insensitive.
6. `(png|jpg|jpeg|gif|webp)` - Matches common image file extensions
7. `$` - End of line

So in summary, the above regular expression can be read as - `[start of line][one of more characers][period][case-insensitive image extension][end of line]`

#### Usage With `grep`

Regular expressions are supported by many Unix command line utilities.

For instance, here's how you could list only the image files in your `Downloads` directory.

```bash
ls ~/Downloads | grep -E '^.+\.(?i)(png|jpg|jpeg|gif|webp)$'
```

Here's a breakdown of this command -

- `ls ~/Downloads` - List the files in your downloads directory
- `|` - Pipe the output to the next command
- `grep -E` - Filter the input with regular expression

#### Usage With `sed`

Another good usage of regular expressions in bash commands could be redacting emails within a text file.

This can be done quite using the `sed` command, along with a modified version of our email regex from earlier.

```bash
sed -E -i 's/^(.*?\s|)[^@]+@[^\s]+/\1\{redacted\}/g' test.txt
```

- `sed` - The Unix "stream editor" utility, which allows for powerful text-stream transformations.
- `-E` - Use extended regex pattern matching
- `-i` - Replace the file stream in-place
- `'s/^(.*?\s|)` - Wrap the beginning of the line in a capture group
- `[^@]+@[^\s]+` - Simplified version of our email regex.
- `/\1\{redacted\}/g'` - Replace the content with the first capture group `\1` and `{redacted}` in place of the email address.
- `test.txt` - Perform the operation on the `test.txt` file.

Warning - This command will automatically remove all email addresses from any `test.txt` that you pass it, so be careful where/when you run it, since *this operation cannot be reveresed*.  To preview the results, simply omit the `-i` flag.

> Note - While the above command should work on most Linux distributions, the macOS uses the BSD implementation is `sed`, which is more limited.  To use `sed` on macOS with decent regex support, I would recomend installing the GNU implementation of `sed` (`brew install gnu-sed`).


```
My email is patrick.triest@gmail.com
```

The result will be a text file with the email redacted:

```
My email is {redacted}
```


### SQL Usage

## Conclusion

#### When NOT To Use Regex
- Is a specialized parser available (ex. HTML, JSON, XML), since a full syntax tree implementation is more appropriate
- Is a specialized library available (ex. email validation)
-

#### Resources -
https://code.tutsplus.com/tutorials/8-regular-expressions-you-should-know--net-6149
https://stackoverflow.com/questions/1449817/what-are-some-of-the-most-useful-regular-expressions-for-programmers
https://projects.lukehaas.me/regexhub/
http://www.mkyong.com/regular-expressions/10-java-regular-expression-examples-you-should-know/
http://www.aivosto.com/vbtips/regex.html
