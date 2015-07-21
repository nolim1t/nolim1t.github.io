---
layout: post
title: "UX for web APIs"
---

# {{ page.title }}

As I'm currently architecting an API (and have done in the past) for an external developer, I think it is important to recognize the importance of UX from an API point of view.

So what is UX from an API perspective.

Lets begin with UX in general. It's not all about what it looks like, but how well it works for the user. 

Your app can end up looking like shit, but it may well have good UX. Inversely, a good designer can do an awesome design - but the user has no idea how to use it, therefore having bad UX.

From an API point of view, you can architect the API to support all the bells and whistles, however the poor soul who has to integrate with it may have a hard time working out how. Or you can opt for a simple architecture, and easy to work with.

UX is about understanding the extremes and meeting someplace in the middle. 

Myself personally, I'd go for the more usable route as an app without users means you're effectively wasting your time. Ever heard of if a tree falls in a secluded forest, does it make a noise. Sure it does, but noone is around to really care.

Anyway here are some tips for API UX

* Make proper use of REST verbs. That is GET for retrieving data and POST for updating or adding data. You can also make use of PUT or DELETE. DELETE is obvious, but personally I use PUT for updating data.
* Respond to various HTTP Headers. Such as Accepts (bonus is to return a response based on what the client defines here), Accept-Language (for localization of responses and error messages)
* Use HTTP status codes that is appropriate to the response. User requested a resource thats not available? Thats a 404. User requested a resource that requires authentication? 401. User sends a request which can't be understood? 400. General errors? 500. Another good reason for doing this is load balancers and CDNs tend to speak this protocol. Be on the same language as they are.
* Have a way of discovering API endpoints. A good way is to make use of the indexes.

I'm sure there are more.

If you want to check out one of my projects which tries to implement all those things, refer to [nolim1t/naked-coffeescript](https://github.com/nolim1t/nolim1t-nakedcoffeescript)
