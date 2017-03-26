---
layout: post
title: "Dynamo DB as a backend"
---

For one of my latest projects, I've opted to go completely serverless (as in not needing to maintain a server).

There's a few options out there.

* Heroku (and addons)
* Google App Engine
* AWS Lambda

For ease of billing, I chose AWS Lambda because of the low entry costs (and Amazons proven track record).

For AWS Lambda it means either using RDS or DynamoDB. I chose DynamoDB, but until recently haven't really worked on a larger project.

Here are the shortcomings with DynamoDB I've found.

* Querying is limited to fetch operations
* You can't sort the results (you need to do it manually)

Other than that it works quite good with data retrieval and obviously is built to scale.

What's your experiences like?
