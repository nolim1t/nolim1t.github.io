---
layout: post
title: "nolim1t.co warrant canary"
---

As a big cryptography fan (PGP) and Tor advocate I'd like to slowly add in
a PGP verified warrant canary which also shows the latest bitcoin block and hash.

Eventually would like to use this for a "proof of life" and/or deadmans switch.

To use the warrant canary you may access the following:

* **Clearnet (https)** [nolim1t.co/canary.txt](https://nolim1t.co/canary.txt)
* **Onion** [nlboxajljr5boevw3vyfryenhwqs5eehfh5pnbzjlnounrje5wulbnyd.onion](http://nlboxajljr5boevw3vyfryenhwqs5eehfh5pnbzjlnounrje5wulbnyd.onion/)

From the command line:

```bash
# Read it over clearnet
curl "https://nolim1t.co/canary.txt"

# Read it over TOR
curl --socks5-hostname "localhost:9050" "http://nlboxajljr5boevw3vyfryenhwqs5eehfh5pnbzjlnounrje5wulbnyd.onion/canary.txt"

# Verify signature over TOR (key: http://nlboxajljr5boevw3vyfryenhwqs5eehfh5pnbzjlnounrje5wulbnyd.onion/key/)
curl --socks5-hostname "localhost:9050" "http://nlboxajljr5boevw3vyfryenhwqs5eehfh5pnbzjlnounrje5wulbnyd.onion/canary.txt" | gpg --verify
```

The PGP signing acts as a timestamp, while the blockchain hash you can further verify that this occured at this particular time with any bitcoin full node or block explorer.

Would like to eventually use this for other documents too as it allows for non-tampering and authentication.

