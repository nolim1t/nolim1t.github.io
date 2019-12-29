# nolim1t.co

## Build status

[![pipeline status](https://gitlab.com/nolim1t/nolim1t-co/badges/master/pipeline.svg)](https://gitlab.com/nolim1t/nolim1t-co/commits/master) [![Bitcoin lightning](https://badgen.net/badge/icon/bitcoin-lightning?icon=bitcoin-lightning&label=donate&color=yellow)](https://tippin.me/@nolim1t)

## About
This is the source for the github site

## Creating a post
Refer to [this guide](http://jekyllrb.com/docs/posts/)

### language of posts
Markdown motherfucker.. do you not speak it?

## Creating pages
Just dump them in the main directory as per [guide](http://jekyllrb.com/docs/pages/)

# Test Often!
## Locally
Simple run the following command

```bash
bundle exec jekyll serve
```

## Build and Test

### Clone

Clone and add gitlab (authoritive source of truth), as well as github backup.

```bash
git clone --recurse-submodules git@gitlab.com:nolim1t/nolim1t-co.git
cd nolim1t-co/
git remote add githuborigin git@github.com:nolim1t/nolim1t.github.io.git
```

### Building

Simply invoke the default rake task to build

```
rake
```

If you have ***TORDEPLOY*** set then it will also deploy the ***_site*** directory into the TOR host to a folder called ***www*** (this is assumed). ***TORDEPLOY*** should be the hostname of the configured tor site.


### Syncing submodules

```bash
git submodule foreach git pull origin master
ls _site
```

### Previewing

```bash
bundle exec jekyll serve
```

### Auto-deployment

If you wish to mirror this site simply add the following deploy key into your server:

```
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIJxyFUr/7z5lhUWfuXsgzPp/vp159GnG8etLuThkZT9J deploykey@pub
```

and then update your web server with the pathnames. You may then send a merge or pull request to me for consideration.


### Donations

You may send donations via bitcoin lightning network to <a href="https://tippin.me/@nolim1t">me</a> if you love my work and support open source (I don't get paid).


