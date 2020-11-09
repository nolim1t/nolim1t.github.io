#!/bin/bash

./canary.sh > ./canary.txt
gpg --clearsign ./canary.txt
echo "---" >> ./header.txt
echo "layout: null" >> ./header.txt
echo "permalink: /canary.txt" >> ./header.txt
echo "---" >> ./header.txt
echo "" >> ./header.txt

# Set up canary.txt
cat header.txt > ./canary.txt
cat ./canary.txt.asc >> ./canary.txt

rm ./canary.txt.asc
rm ./header.txt

