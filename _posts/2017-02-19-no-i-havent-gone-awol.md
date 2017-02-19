---
layout: post
title: "I'm not AWOL ... yet"
---

Wow, It's been a good two months since my last post here, so I think it's high time to do a first post for 2017. No I haven't gone AWOL yet haha.

Life does in fact have a habit of getting in a way.

Professional wise, it has been a bit quiet (December / January festivities in full swing),
but now that the festivities are now out of the way it's time to get down to business.

### On the tech side, what have I been up to lately?

* **Discovering new javascript test frameworks** Trying out facebook's javascript test framework called [jest](http://facebook.github.io/jest). It's so far the easiest to use. I've been mostly writing backend tests for now but, apparently it works with frontend too (supposed to play nicely with react).
* **Discovering new AWS Lambda frameworks** Experimenting with the [Serverless Framework](https://serverless.com/), also something a bit more lightweight called [ClaudiaJS](https://claudiajs.com/)
* **Stripe API development** Messing around with [Stripe event callbacks](https://github.com/nolim1t/stripe-events-webhook) to improve the UX for my billing system (without touching the existing payment code)
* **General Housekeeping** Migrating and testing all my AWS Lambda services to the newer version of node.js as the old version is getting deprecated.

### So what kind of projects am I tackling?

* **Serverless blogging** This blog, as well as my [food/travel blog](https://itinerantfoodie.com). This blog runs off github pages, while the other blog is a jekyll powered site through Amazon S3 and Cloudfront. I've recently added the ability to upload photos from my phone to my blog lately.
* **Improved image uploading for my travel blog** - I've done a good job at automating most of the upload and image resize process, however I do really want to get it to the point that it runs off a serverless platform so I can upload the images straight from my mobile device. Luckily, I have a client project who would probably use this technology so there would be bit of an overlap
* **Automate more of my back office functions** for both my consulting business and apartment rental business, so I spend less time on boring stuff and more time on exiting stuff.

### Conclusion

Have created and updated the following open source projects.

* [**Event Logger**](https://github.com/nolim1t/event-logger) - I created this project in order to experiment with Stripe (as well as github) webhooks. Mainly to see what it receives.
* [**Stripe Events Webhook**](https://github.com/nolim1t/stripe-events-webhook) - This project spawned from the event logger prokect
* [**AWS S3 Signer**](https://github.com/nolim1t/aws-s3-policy-signer-api) - This is the backend component for signing temporary tokens WITHOUT exposing your AWS Secret key to the outside world
