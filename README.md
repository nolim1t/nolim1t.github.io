# nolim1t.co

## Build status

[![pipeline status](https://gitlab.com/nolim1t/nolim1t-co/badges/master/pipeline.svg)](https://gitlab.com/nolim1t/nolim1t-co/commits/master)

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

### Syncing submodules

```bash
git submodule foreach git pull origin master
ls _site
```

### Previewing

```bash
bundle exec jekyll serve
```
