---
layout: post
title: "Decentralized content hosting"
---

As of lately I've been looking at hosting content in a decentralized manner, as part of my whole hosting your own payment box project.

How I'm doing it? It's a thing called IPFS. It's been around for a while, but it's perfect for this project of mine. To be able to keep files without a hosting provider. Say for example hosting the bitcoin blockchain snapshot should now be a lot easier.

To demonstrate do the following (on a RPI device):

```bash
# Grabbing from docker
docker pull nolim1t/ipfs:0.4.18

# Set up a config directory for ipfs to dump its files
mkdir $HOME/ipfs-share

# Setting up
docker run -d -p 8080:8080 -p 4001:4001 -p 5001:5001 -v $HOME/ipfs-share:/data/ipfs --name=arm-ipfs --rm nolim1t/ipfs:0.4.18
```

## Adding files

```bash
# Set up a directory where you can pin stuff
mkdir -p $HOME/ipfs-share/public

# Add files
docker exec -ti arm-ipfs ipfs add -r /data/ipfs/public/test_file_or_directory
```

## Pinning files

From another machine (using a similar setup)

```bash
# Lets say to pin /ipfs/QmPJu3J8pY8iRMUnzTJaofX3toKrY3AjoCz1PoBNd2DetQ
docker exec -ti arm-ipfs ipfs pin add QmPJu3J8pY8iRMUnzTJaofX3toKrY3AjoCz1PoBNd2DetQ
```


You should be able to now see the content on ```https://cloudflare-ipfs.com/ipfs/HASHNAME``` or ```https://gateway.ipfs.io/ipfs/HASHNAME```

For example, [this content](https://gateway.ipfs.io/ipfs/QmPJu3J8pY8iRMUnzTJaofX3toKrY3AjoCz1PoBNd2DetQ)
