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
* **Issue emailing** - All projects if enabled can support creating of issues through email, for those who do not have a Gitlab account. Therefore you can also add it into your support ticketing system.

However, I've been doing buildx builds on github because learning how to use QEMU from scratch seems a bit of a drag (I should get to this soon) until I discovered [this container](https://gitlab.com/ericvh/docker-buildx-qemu) which actually lets you do cross platform builds with Gitlab CI.

I've already started implementing this across some projects.

* [Docker Verify](https://gitlab.com/nolim1t/docker-verify) - which is my SHA256SUM verification service over docker, for verifying SHA256SUMs of a file and also verifying the GPG signature of the SHA256 file.
* [Example Project](https://gitlab.com/nolim1t/gitlab-ci-matrix-build-test) - As a good OSSer (like mathematics person), its always good to show how you did things for future reference. So I'm including the project here too.

## Why I have been into cross architecture builds

Cross architecture builds ties into decentralization and less supply chain issues - as we've using during 2020 p(l)andemic. I'd like to support as many architectures as possible ideally, but of course some things might be restricted to 64-bit systems.

And with Apple's push into building its own CPU, and also a user of the [pine64 Pinebook](https://www.pine64.org/pinebook-pro/) and [PinePhone](https://www.pine64.org/pinephone/) which can be a nice desktop system. I'd like to have things available on multiple systems.

This also works to my advantage when deploying to embedded devices - currently the Raspberry PI 3/4 which I've done for the last 2 years, while building the Ultimate Financial Sovereignity box (see [The Box and Umbrel project](https://nolim1t.co/projects/).

## Deep dive into the Example

With [the example](https://gitlab.com/nolim1t/gitlab-ci-matrix-build-test/-/blob/master/.gitlab-ci.yml) I've used the QEMU image above as well as `docker:dind`

I've tailored the script to work with both Gitlab CI or Docker hub if `DOCKER_USERNAME` and `DOCKER_PASSWORD` variables are set.

So the end result, will be a docker buildx manifest pushed to docker hub or gitlab container registry (for maximum sovereignity).

I'm also looking at pushing to both, as well as utilizing [github's own container registry](https://github.com/nolim1t/docker-spotifyd/blob/master/.github/workflows/docker-publish-github.yml) because I support full decentralization and we need to use multiple platforms to get the best for your project.

For Github, the strength is the strong network effect of projects and it is always a good place to discover new things or developers (and their abilities through what they've done).

For those who wish to suggest stuff, please mention this post and [create an issue](https://gitlab.com/nolim1t/nolim1t-co/-/issues) (you may also email your issue in)
