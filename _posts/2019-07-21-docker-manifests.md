---
layout: post
title: "Docker manifests: Usability across multiple architectures"
---

While doing a cross platform framework for orchestration targeting both ARM and AMD64 devices, I have 
been using a functionality called docker manifests.

This allows you to have multiple images in one docker tag. 

It's currently an experimental feature right now so needs to be enabled.

## Configuring Docker

Can be done by doing the following entry to your ***~/.docker/config.json*** file

```
"experimental": "enabled"
```

Also it requires you to have an available image for each architecture so that you can 
annote it to the manifest.

### Sample config file

Here is a sample of what the configuration should look like

```
{
    "auths": {
        "https://index.docker.io/v1/": {
        "auth": "Your-Authorization-Key-Here"
        }
    },
    "HttpHeaders": {
    "User-Agent": "Docker-Client/18.09.5 (linux)"
    },
    "experimental": "enabled"
}

```

## Set up Manifests

Next step is to build, tag, and push the builds on ***each platform*** to docker hub.

Be prepared to name them by architecture so you can reference them later.

## Lets create the manifest

Now we have all the names for each tags do the following command

```bash
docker -D manifest create username/repo:tagwithmanifest  username/repo:archtag1 username/repo:archtag2 username/repo:archtag3
```

### Now we annote each manifest

We need to now add an annotation to each manifest. By default it is ***linux amd64*** (assuming you used a 64bit linux device).

In the below example I am adding metadata to  ***archtag2*** and ***archtag3*** with the appropriate architectures.

```bash
docker manifest annotate  username/repo:tagwithmanifest username/repo:archtag2  --os linux  --arch arm  --variant v6
docker manifest annotate  username/repo:tagwithmanifest username/repo:archtag3  --os linux  --arch arm  --variant v7
```

### Checking the changes

Finally Check that the changes have been applied

```bash
docker manifest inspect username/repo:tagwithmanifest
```

#### Example of inspect file

An example should look like this

```
{
   "schemaVersion": 2,
   "mediaType": "application/vnd.docker.distribution.manifest.list.v2+json",
   "manifests": [
      {
         "mediaType": "application/vnd.docker.distribution.manifest.v2+json",
         "size": 950,
         "digest": "sha256:6b1c68ef1540a6d1fdeb75a48c192d6a3905f63920513b3715e474f74e630d9d",
         "platform": {
            "architecture": "amd64",
            "os": "linux"
         }
      },
      {
         "mediaType": "application/vnd.docker.distribution.manifest.v2+json",
         "size": 950,
         "digest": "sha256:f55c26d0ffac307d569c055588268e27898d877a152f8f295feaa76004a94d16",
         "platform": {
            "architecture": "arm",
            "os": "linux",
            "variant": "v7"
         }
      }
   ]
}
```

## Pushing your Manifest to dockerhub

If everything is good, you may push the manifest to dockerhub

```bash
docker manifest push username/repo:tagwithmanifest
```

## Testing out your docker hub changes

First of all wipe down all the images using the ***docker images*** command. Then execute ***docker rmi*** against all the images.

Next pull the docker image from docker hub on each environment

```bash
docker pull username/repo:tagwithmanifest
```

After you have fetched the tag, you can furthermore try to run it but if it fetchable it should already work.

