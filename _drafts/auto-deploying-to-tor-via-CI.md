---
layout: post
title: "Auto-deploying a to TOR via CI (or CD)"
---

Just a follow-up to <a href="https://nolim1t.co/2019/11/02/we-on-tor.html">this post</a> which announces and explains how the tor site for this site (and my other pages works), I'd like to share how I've done it.

For sake of being platform agnostic, I'll explain in detail how to use it on Github as well as Gitlab.

## Github

For Github, this is actually the easiest. And also supports many build environments.

The pre-requisites (as of December 2019) is to have GitHub Actions enabled for your account, as its still in beta.

Once enabled simply create a file in **.github/workflows** and simply adding steps.

In the directory you can have different workflows, and also define a schedule as well (handy for Continuous Deployment or regular automated testing).

A workflow step in a github action either comprises of a docker module (with parameters and environment variables) or executing a shell command.

The docker module actually makes it quite versatile as people can author their own addons, such as <a href="https://github.com/nolim1t/actions">mine</a> which is used heavily in this site (and others) for deployment. I mainly use it for deploying to TOR sites which does not work out of the box.

The big drawback is Github is vendor lock-in, and we all know Microsoft (owners of Github) has a history of that.

## Gitlab

For Gitlab this requires a bit more knowledge, and I think only supports scripts in a Linux environment.

The CI/CD also supports scheduling (I haven't tried yet), and is a more open platform as you can run your own builders and instances - so there is less chance of vendor lock in.

This may be useful if you are doing development for corporates or governments which tend to like hosting their own, or blockchain type people who like open/decentralized platforms (after all git is open and decentralized at protocol level).

To define a CI file, you need to enable it (I think, but don't recall) in project settings and then create a file called [**.gitlab-ci.yml**](https://github.com/nolim1t/nolim1t.github.io/blob/master/.gitlab-ci.yml),

There's no modules like in github actions but you can define stages (environments) as well as what needs to happen before (and probably after) deployment.

This actually mirrors most CI/CD systems (such as Travis), so to learn the file syntax there isn't such a big learning curve.

However you have to define each step, and for free runners - execution is limited to 1 hour as opposed to 6 hours on github.

## Conclusion

For portability/versatility I do recommend going with Gitlab.

But for ease of use or building on other platforms (Windows / OS X as well as Linux), choose Github. 
