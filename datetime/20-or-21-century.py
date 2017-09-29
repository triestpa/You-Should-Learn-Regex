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
