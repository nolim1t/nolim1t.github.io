---
layout: post
title: "SSL all the things!"
---

Recently some SSL certificates that I’ve owned are now expired, and because the new initiative called lets-encrypt has already launched - I’ve decided to give the service a spin.

Because I’m using AWS cloudfront and elastic load balancer, I actually have to manually generate the certificate using the “-a manual” switch.

Also because some of my sites are hosted on S3 (static sites), this was a good opportunity to try out the platform.

Some findings

- Even though the certificate lasts for 3 months, there’s almost no excuse not to have a SSL certificate because its free
- You can have more than one domain name on the certificate (this actually saves a lot of time if you own multiple domain names)
- Wildcard domains aren’t supported, but because of the previous point you can just add more domains on.
- You can’t have a SSL certificate on a custom S3 domain, you need to use cloudfront. Also keep in mind that for static websites you need to set the origin for the static website endpoint rather than the S3 bucket endpoint
