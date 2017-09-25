// include the latest version of the regex crate in your Cargo.toml
extern crate regex;

use regex::Regex;

fn main() {
  let regex = match Regex::new(r"(?m)^([0-9]+)$") {
    OK(r) => r,
    Err(e) => {
      println!("Could not compile regex: {}", e);
      return;
    }
  };

  let string = "1234";

  // result will be an iterator over tuples containing the start and end indices for each match in the string
  let result = regex.find_iter(string);

  for (start, end) in result {
    println!("{}", &string[start..end]);
  }
}