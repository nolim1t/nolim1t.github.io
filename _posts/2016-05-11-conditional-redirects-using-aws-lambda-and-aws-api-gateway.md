---
layout: post
title: "Doing conditional redirects using AWS Lambda and AWS API Gateway"
---

As a precondition, you’ve already got AWS Gateway configured.

After pouring through the sparse documentation and limited posts for how to the basic HTTP functionality of just doing a redirect I’ve come up with a way of doing this.

The things you need to do first is:

* Have your code display the URL somehow
* Use context.fail() for displaying the URL

Then 

1. Go to the API
2. Go to Resources
![Step 1](https://d3hs7z89jfjpsh.cloudfront.net/nolim1t.co/20160511/step1.png)

3. Go to the API resource
4. Go to the API method (in my case POST)
5. Set up a Method Response
6. Add 302, with a location header. Leave Model blank
![Step 2](https://d3hs7z89jfjpsh.cloudfront.net/nolim1t.co/20160511/step2.png)

7. Go back to Method Execution
8. Go to Integration Response
9. Add http.* as an error regex with 302 status
10. Go to Header Mappings, and for Location add “	integration.response.body.errorMessage” (without the quotes.
![Step 3](https://d3hs7z89jfjpsh.cloudfront.net/nolim1t.co/20160511/step3.png)

11. Deploy the API, and you should be done 

Another good resource you can use is [this page too](https://rpgreen.wordpress.com/2016/01/04/how-to-http-redirects-with-api-gateway-and-lambda/)
