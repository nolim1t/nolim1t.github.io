---
layout: post
title: "Considering a new developer machine... and I'm getting conflicted whether I should stick on macOS or not"
---

I switched to macOS (or lets say OS X), around the time where Steve Jobs made the transition from PowerPC to Intel - more than 10 years ago. 

Before that I was mostly a Linux user, but the biggest pain point was getting wifi drivers to work.

But nowadays, I'm a bit conflicted.

I still like using the Mac because of the sleek form factor, unixy operating system and battery life - but I have to wonder if there's a good linux alternative which offers the same.

Maybe I'm just bitching, but I realized I needed to tweak my openSSL a little to install the latest [blockstack CLI](http://github.com/blockstack) on my system.

For those of you who are having issues, check out [this gist](https://gist.github.com/nolim1t/252dec192734047d3c9a6097050184a2) or check below

```bash
# Remove all copies of openssl
brew uninstall --force openssl

# Set up environment
export OPENSSL_INCLUDE_DIR=`brew --prefix openssl`/include
export OPENSSL_LIB_DIR=`brew --prefix openssl`/lib
LDFLAGS="-L$(brew --prefix openssl)/lib" CFLAGS="-I$(brew --prefix openssl)/include" pip install cryptography --upgrade

# Finally install blockstack
pip install blockstack --upgrade
```
