---
layout: post
title: "Docker manifest files"
---

While doing a cross platform framework for orchestration targeting both ARM and AMD64 devices, I have 
been using a functionality called docker manifests.

This allows you to have multiple images in one docker tag. 

It's currently an experimental feature right now so needs to be enabled.

Can be done by doing the following entry to your ***~/.docker/config.json*** file

```
"experimental": "enabled"
```

Also it requires you to have an available image for each architecture so that you can 
annote it to the manifest.

