---
layout: post
title: "Custom domain SSL, Let's Encrypt and AWS Lambda"
---

In case you have been living under a rock, there is a cool initiative called [Let's Encrypt](https://letsencrypt.org/).

It is a service which lets you have a completely free SSL certificate with a few caveats

* First of all, the SSL certificates last for only 3 months.
* Secondly, in order to create a certificate you need to have a domain name configured and access to the domain

Those are fine for conventional server methods, but for AWS Lambda + API Gateway, you actually need to give the key first in order to link a custom domain to it.

So what do I do?

First of all I set up a AWS S3 bucket to store the lets encrypt challenge text file. Next, I set up AWS Cloudfront. 

## My Cloudfront configuration

I set it up so that I can point the required cname records to the domain name.

Then I set up two origins. 

The default going to the AWS API Gateway endpoint (please note to allow all the HTTP methods and turn on forward query strings too.

And the other one, with the path pattern **.well-known/acme-challenge/** going to the S3 bucket.

## The rest

Then invoke the following

```bash
./certbot-auto certonly -a manual
```

and then fill in all the information and follow the instructions. 

You will need to create a challenge file on AWS S3. I recommend storing the challenge locally in a file called acme-challenge

And for each server you need to do this (which uploads a file as a public file)

```bash
aws s3 --profile=yourprofile  --region=regionname cp acme-challenge s3://s3bucketname/.well-known/acme-challenge/thefilenametofetch --acl public-read
```
Test out the URL first and then hit ENTER to verify through the certbot tool.

Then use AWS IAM to upload the certificate.

Here is an example

```bash
aws --profile=perceptionz iam upload-server-certificate --server-certificate-name certificatename --certificate-body file:///tmp/cert.pem --private-key file:///tmp/privkey.pem --certificate-chain file:///tmp/chain.pem --path /cloudfront/
```

Now you should be able to see your certificate in cloudfront. I hope to script this soon as this is quite a long winded process which needs to be done every 3 months but it works.
