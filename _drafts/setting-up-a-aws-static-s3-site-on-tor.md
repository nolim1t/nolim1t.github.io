---
layout: post
title: "Setting up a AWS static S3 site on TOR"
---

As of lately, I've been trying to move most of the features off itinerantfoodie.com from a keystone CMS + MongoDB powered site to a jekyll powered blog (like this one). Note that the designs is very similar.

I've had an [existing .onion site](http://gqjsnjzfwc5vbfhi.onion/) which I would like to restore service to.

## Why Static sites?

A jekyll powered blog loads a lot faster as the web is only static pages are served.

You can have fancy market within the blog, which gets built automatically. If you take a look at the [itinerantfoodie web](https://github.com/itinerantfoodie/itinerantfoodie.static) project on github, the full site source is there include travis CI configuration.

Yes, whenever I push to the project, the site automatically builds and updates Amazon S3. Automation!

And static sites are the fastest way to serve content to a user. Great for blog readers.

## Back on topic

But lets get back on topic. TOR.

### Requirements

* Amazon EC2 instance (micro/nano) will do. I recommend Ubuntu
* TOR installed (you can use apt-get to install it)
* node.js installed (I recommend installing nvm)

#### Step 1

Check out the [following project](https://github.com/itinerantfoodie/http-localhost-pipe). This is what I use for piping the origin to localhost. It's pretty much a beta quality code. Feel free to send pull requests to fix it up.

#### Step 2

Go to the project directory and do a **npm install**

#### Step 3

Edit **server.js** with your details. Then open up screen and then do **node server.js**

Then exit out of screen and do CTRL+A+D

Eventually would like to run this on docker + supervisord (so we eliminate most of the steps)

#### Step 4

Edit **/etc/tor/torrc** and look for the following

* HiddenServiceDir
* HiddenServicePort

HiddenServiceDir is basically where the tor server will look. If it doesn't exist it will generate an onion site. You should back up this directory so you can keep the onion site.

HiddenServicePort is basically where to forward the port to the localhost server. For example: **HiddenServicePort 80 localhost:3000**

#### Step 5

Restart the TOR service and check out your new .onion service

And you're done!
