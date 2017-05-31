---
layout: post
title: "AWS Lambda cron tasks"
---

While it's been around for a while - I've recently started doing some messing around with it.

## The key features

* Pay for what resources you use (compute time, storage, etc)
* No need to keep up a server. Even though nano instances are cheap, there is a hidden cost in maintaining it.
* Run every minute, a couple of minutes, every hour, or every day

## My use case

I'm currently using this for monitoring the positions for my trades. As it's not really time sensitive for this one, I've set it for every hour.

I'm going to eventually experiment with doing a trading bot / simulator using the every minute cron feature to see how feasible it is.

## How to access this feature

* Deploy your AWS Lambda script as usual (node.js / java / python)
* In the AWS Lambda console, under your Lambda function seek out the tab called **Triggers**
* In the triggers tab, choose "CloudWatch" and pick a schedule from there. Your Lambda should execute as per the schedule you define
