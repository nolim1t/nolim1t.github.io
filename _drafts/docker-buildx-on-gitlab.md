---
layout: post
title: "Docker buildx on gitlab"
---

I've been digging a lot of the gitlab features lately. 

Features I like

* **Sovereignity** - Back to basics. The internet is designed as a decentralized network. But there is a lot of centralization lately. So having the ability to self-host for builders and runners is great.
* **Web IDE** - Sometimes I like to edit code from the web browser rather than go through the painstaking way of doing the `git pull` and `git push` dance. Not all IDEs support `git` let alone ARM systems (which I'm using these days). I'd like to have less platform reliance on anything yet be productive at the same time.
* **Gitlab Docker Registry** seems a lot more mature than github is
* **Syncing with other git repos** - I've been using this a lot lately. Mainly my way of following development and keeping my own copy of repos. You can take a look at some [OSS Projects](https://gitlab.com/lncm/upstream-oss) which are being synced here that I am following.
* **Repository icons** -  Makes the repository view look less boring.

However, learning how to use QEMU from scratch seems a bit of a drag until I discovered [this container](https://gitlab.com/ericvh/docker-buildx-qemu) which actually lets you do cross platform builds with Gitlab CI.

I've already started implementing this across some projects.

* [Docker Verify](https://gitlab.com/nolim1t/docker-verify) - which is my SHA256SUM verification service over docker, for verifying SHA256SUMs of a file and also verifying the GPG signature of the SHA256 file.
* [Example Project](https://gitlab.com/nolim1t/gitlab-ci-matrix-build-test) - As a good OSSer (like mathematics person), its always good to show how you did things for future reference. So I'm including the project here too.

## Deep dive into the Example

With [the example](https://gitlab.com/nolim1t/gitlab-ci-matrix-build-test/-/blob/master/.gitlab-ci.yml) I've used the QEMU image above as well as `docker:dind`

I've tailored the script to work with both Gitlab CI or Docker hub if `DOCKER_USERNAME` and `DOCKER_PASSWORD` variables are set.

So the end result, will be a docker buildx manifest pushed to docker hub or gitlab container registry (for maximum sovereignity).

I'm also looking at pushing to both, as well as utilizing [github's own container registry](https://github.com/nolim1t/docker-spotifyd/blob/master/.github/workflows/docker-publish-github.yml) because I support full decentralization and we need to use multiple platforms to get the best for your project.

For Github, the strength is the strong network effect of projects and it is always a good place to discover new things or developers (and their abilities through what they've done).

