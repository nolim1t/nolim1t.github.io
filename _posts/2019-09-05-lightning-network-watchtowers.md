---
layout: post
title: "Lightning Network Watchtowers"
---

Yet another Lightning Network post. But I've been taking a look at the LND release candidates 0.7.0, which features watchtowers.

It's relevant to the project that I'm working on as the mission is to use small factor devices so it would be good to use this.

Anyhows, I've decided to set up a watchtower.

To use simply add the following to your config (choose either one, clearnet or TOR):

```
[wtclient]
wtclient.private-tower-uris=02c690cdb81fec5caa9f0b1c925a13ee5412c0232668bd8c5787165532d577f689@ln-vps.nolim1t.co:9911
wtclient.private-tower-uris=02c690cdb81fec5caa9f0b1c925a13ee5412c0232668bd8c5787165532d577f689@lncmnlgypuendl5t.onion:9911
```

## Running it

I've got a dockerified version on **lncm/lnd:0.7.1-neutrino-wt** which you can use or you can use [this repo](https://gitlab.com/nolim1t/lnd/tree/v0.7.0-beta-rc3-mainnet) which should build on most environments

