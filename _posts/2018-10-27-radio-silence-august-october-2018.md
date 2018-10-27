---
layout: post
title: "Radio Silence: August to October 2018"
---

You may have noticed a big gap between August and September in my postings.

I have some perfectly good reasons for it.

First things first, I was a bit worried about the impending Microsoft acquisition of github.

Microsoft tends mess things up for the companies. See **Skype** which is only a shadow of its former self.

So immediate project was to move stuff across to GitLab, but also keep github - because Why not. Git is supposed to be decentralized.

I spent time learning the ins and outs of GitLab pages and figured that its a way more superior product.

First things first, SSL for custom domains! So now this site (as of the last 3 months is now available through SSL).

Next off, the CI tools inbuilt to GitLab which builds custom sites can be also use to build custom sites and have it push to AWS S3. I worked around that with Github by doing a [travis script](https://github.com/itinerantfoodie/itinerantfoodie.static/blob/master/.travis.yml) that calls [Ruby Bundler](https://github.com/itinerantfoodie/itinerantfoodie.static/blob/master/Rakefile). This also works well with [GitLab CI](https://github.com/itinerantfoodie/itinerantfoodie.static/blob/master/.gitlab-ci.yml).

Next, I got involved with an open source group during my travels in Chiang Mai related to programming payment processing boxes. Its a great impactful and disruptive project (particularly in developing countries - Laos and Myanmar could use this). And always great to work with passionate and smart people who do open source too.
