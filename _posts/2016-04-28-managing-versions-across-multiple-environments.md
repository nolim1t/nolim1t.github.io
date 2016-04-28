---
layout: post
title: "Managing versions across multiple environments"
---

As a developer it’s important to have a consistent environment for several reasons.

* Working as a team In today’s modern work world (especially in the BYOC/BYOD culture, or engaging with external people or in startups where they may not provide you with your own hardware because “startup budget”) everyone has different hardware and software setups. This means they will have different system versions of  node.js / ruby / python - and also different ways of patching this.
* Standardized production environment: It’s ideal to have the production environment (version wise) to be exactly the same as the development environment. The closer you can get it, the more bugs you can catch before. More bugs caught = happier customers.
* Better Quality Assurance/Control Processes: Developers or anyone else are not very good at catching their own mistakes. From a UX point of view if you have better developed product, you would probably want to have some dedicated quality assurance people (or engage with another quality assurance provider).  But to have a good Quality Assurance Process you need to know what sort of versions they need to use.

Tools you can use (I know there are others, but this is what I use)
- Ruby: [rbenv](https://github.com/rbenv/rbenv)
- Node.js: [nvm](https://github.com/creationix/nvm)
- Python: [pyenv](https://github.com/yyuu/pyenv)
- Systems/Infrastructure (and deployment): [puppet](https://github.com/puppetlabs/puppet), [chef](https://github.com/chef/chef), [docker](https://github.com/docker/docker)

Using the above tooling let you choose the version that will be run across all environments (as well as not mess up someones local system - personally I do not take too kindly to someone making me install software packages, unless you’re a top paying client)

[Medium article](https://medium.com/@nolim1t/managing-versions-across-multiple-environments-2c1f2f7cdb81#.i8faw69n8)
