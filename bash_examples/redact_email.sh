#! bin/bash
gsed -r 's/^(.*?\s|)[^@]+@[^\s]+/\1\{redacted\}/g' test.txt