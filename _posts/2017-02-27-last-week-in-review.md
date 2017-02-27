---
layout: post
title: "Last week in review - Cloudbleed, SHA1 collision, Bitcoin all time high"
---

Last week was an interesting week as far as tech is concerned in making history. Some good, some bad.

## Cloudbleed exploit

Remember heartbleed? There's a new buffer overflow exploit against the Cloudflare edge servers which allow it to leak http headers, cookies, requests, or HTTP POST data. Sometimes all this got cached.

The exploit affects quite a lot of sites who used Cloudflare giving the dangers of centralization. This is why I tend to support decentralized projects such as:

* [Git](http://git-scm.com/)
* [Bitcoin](https://bitcoin.org/)
* [Blockstack](https://blockstack.org/)
* The decentralized governance in [Dash](https://www.dash.org/news/the-dash-network-approves-the-implementation-of-decentralized-governance-system/)

I'm not a big fan of having a single point of failure for anything (even the human element can get corrupted).

## Bitcoin All time high

Last week bitcoin had exceeded the previous high of 1129 US dollars, and now heads into uncharted territory. Currently as of the writing of this post, 1 Bitcoin is priced at 1179 US dollars.

## SHA1 collision

After 20 years since SHA-1 was released, cryptographers have found a way to generate a SHA-1 collision (papers [here](https://shattered.it/)).

In other words, using that encryption algorithm to verify and validate the authenticity of documents can no longer be trusted.

It also brings the danger that all things don't last forever, and that it needs to be updated. 
