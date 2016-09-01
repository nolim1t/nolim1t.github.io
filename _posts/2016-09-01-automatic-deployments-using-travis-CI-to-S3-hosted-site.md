---
layout: post
title: "Automatic deployments using travis CI to S3 hosted site"
---

Recently I've been deciding on whether or not I should host my jekyll powered blog on github pages or an Amazon S3 bucket.

I decided to go with Amazon S3 on AWS this time, because github pages, while good - I wanted SSL for custom domains too. Because 2016 and all.  Plus I also wanted to redirect parts of the site to different S3 buckets too.

For that site, the only thing I missed about github pages was embedding inline code / text snippets, which jekyll doesn't seem to do. But that site didn't really need it. I'm sure theres a plugin out there.

Here is what I did.

* Set up a static S3 bucket to host all the SSL challenges (http and https)
* Set up the main S3 bucket for the site
* Set up cloudfront endpoint which defaults to the main S3 bucket, but also forwards all requests that go to /.well-known to my SSL challenge S3 bucket. That way when I

## First things first

### Travis CI settings

Travis CI will need to known some AWS credentials. But first of all you need to set up an IAM account and policy (this is recommended!), that restricts the account to the site you are updating. It may encrypt the details, but you should be extra safe if the tools are given to you.

You need to set the following values in travis CI. Also enclose it with "" because sometimes the build may fail because the AWS keys sometimes have values which is intepreted differently.

Here are the keys:

* AWS_ACCESS_KEY_ID
* AWS_SECRET_ACCESS_KEY
* AWS_DEFAULT_REGION

And here is the AWS IAM Policy document

```javascript
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": "s3:ListAllMyBuckets",
            "Resource": "arn:aws:s3:::*"
        },
        {
            "Effect": "Allow",
            "Action": "s3:*",
            "Resource": [
                "arn:aws:s3:::static.itinerantfoodie.com",
                "arn:aws:s3:::itinerantfoodie.com",
                "arn:aws:s3:::static.itinerantfoodie.com/*",
                "arn:aws:s3:::itinerantfoodie.com/*"
            ]
        }
    ]
}
```

### Now lets activate the changes

Hopefully you set up travis to only build if you have a .travis.yml file present.

Heres my file for reference. So what I'm doing is that I'm installing all the libraries to the travis CI docker instance, including the AWS command line tool

```yaml
language: ruby
rvm:
    - 2.3.0
before_install:
    - "sudo apt-get update -qq"
    - "sudo apt-get install -qq wget curl"
    - "gem install bundler"
    - "wget https://s3.amazonaws.com/aws-cli/awscli-bundle.zip"
    - "unzip awscli-bundle.zip"
    - "sudo ./awscli-bundle/install -i /usr/local/aws -b /usr/local/bin/aws"
    - "./awscli-bundle/install -b ~/bin/aws"
    - "./awscli-bundle/install -h"
    - "rm -fr _site/awscli-bundle.zip"
    - "rm -fr _site/awscli-bundle"    
install:
    - "bundle install"
```

Oh and you'll also need to have the **rake** gem and a Rakefile for this too.

Here is what I used for my Rakefile (redacted)

```ruby
task :default do
  sh "rm -fr _site"
  sh "bundle exec jekyll build"
  sh "rm -fr _site/awscli-bundle.zip"
  sh "rm -fr _site/awscli-bundle"
  sh "rm -fr _site/ssl-challenge"
  sh "aws s3 sync ./_site s3://your-s3-bucket-name-here --region your-aws-region-here --exclude '.DS_Store' --exclude 'node_modules/*' --exclude '.git/*' --exclude '.gitignore' --exclude 'Gemfile*' --exclude 'Rakefile' --exclude 'awscli-bundle*' --exclude 'ssl-challenge/*' --exclude '*.md' --acl public-read"
end
```

After this you should be good to go, commit your changes and watch it automatically deploy to S3.
