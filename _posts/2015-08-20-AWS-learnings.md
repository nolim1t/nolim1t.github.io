---
layout: post
title: "AWS Learnings"
---

# {{ page.title }}

As a full stack developer, I don't think its enough to only know about the application backend as well as the layer which the user interacts with your application.

And for a current project, instead of using a PaaS, Its also nice to do IaaS instead to fully understand how everything connects up. AWS has its shortcomings (such as lack of IPv6 which hopefully they will address very soon), but it seems they support the startup community alot by giving out the free credits (this is why I'm using AWS. Can't say NO to US$10,000 per year of credits right)

You should also have an understanding about networking, infrastructure, and servers.

Some lessons I've learnt when setting up an elastic load balancer for one of my applications as a proof of concept:

* Make sure you configure the security group of the instances to allow connectivity for the load balancer. Apparently, you can firewall off stuff from amazon's services.
* Make sure you get the load balancer to connect to the right port
* If you're using a SSL certificate you might have to generate the public and private key in PEM format instead of key/crt format. You can use command line SSL for this.
* You can have instances in different availability zones too. i.e. us-east-1a / us-east-1b / etc

I'm sure there will be more posts on AWS or infrastructure. Most likely on:

* Internal Load Balancers
* Why docker is awesome?
