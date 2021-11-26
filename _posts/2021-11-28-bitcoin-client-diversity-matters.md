---
layout: post
title: "Bitcoin client diversity matters"
---

One thing I can appreciate about Bitcoin is the concept of not being forced to opt-in to anything (no hard forks), and many different implementations of the reference client (even layer 2).

Also being open source, **anyone** can contribute to projects. It's all done on merit.

But, back to the main point of this post. I've now set up a new docker container for [Bitcoin Knots](https://github.com/nolim1t/docker-bitcoinknots) (you can learn more about its implementation via links on the repo). 

This container follows the same building and archiving regime as the [bitcoind docker project](https://github.com/lncm/docker-bitcoind) which is used throughout many implementations.

[Umbrel](https://getumbrel.com) being the biggest, as I am also one of the OG contributors for that project. However, I do recommend using [Citadel node](https://github.com/runcitadel/) over this now as they are fully open source and also use this.

Citadel will also support alternative bitcoin implementations going forward. Which was one of the main drivers of the containers. 

I'll also be running a bitcoin knots node for better network diversity too. I already have 3 bitcoin core nodes, but would like to use an alternative implementation too.

In future, I'd also like to support the [btcd implementation](https://github.com/btcsuite/btcd) for docker containers too.


