---
layout: post
title: "Reading HTTP POST requests to an AWS Lambda function"
---

This has taken me some time to figure out.

I've figured out the GET part easily enough, but the POST part through API gateway requires the format into **application/json** and not **application/x-www-form-urlencoded**

This is ok if you're building your own APIs, however if you want to be a good internet citizen and stick with the usual standards - **most APIs actually use application/x-www-form-urlencoded** for POST requests.

But I finally found a solution (and it seems to work out quite well. Almost too well in fact.

## The Steps

1. Amazon API Gateway -> Click "Create API".
2. Enter in the API details. Something descriptive will do
3. Click "Create API".
4. Click "Create Resource".
5. Enter in details of the resource (this is how you would access the API)
6. Click "Create Resource".
7. Click "Create Method".
8. Select "POST" or "GET" (this is how you would request the resource)
9. Integration type = "Lambda function", pick region as appropriate, write code as appropriate to action / store form data.
10. Click "Save", click "Ok" to grant permission.
11. Click "Integration Request".
12. Click "Mapping Templates".
13. Click "Add mapping template".
14. Content-Type is "application/x-www-form-urlencoded" and click the tick.
15. Click "application/x-www-form-urlencoded".
16. Click the pencil icon next to "Input passthrough".
17. Select "Mapping template".
18. Paste the following into the template box

```code
## convert HTML POST data or HTTP GET query string to JSON
 
## get the raw post data from the AWS built-in variable and give it a nicer name
#if ($context.httpMethod == "POST")
 #set($rawAPIData = $input.path('$'))
#elseif ($context.httpMethod == "GET")
 #set($rawAPIData = $input.params().querystring)
 #set($rawAPIData = $rawAPIData.toString())
 #set($rawAPIDataLength = $rawAPIData.length() - 1)
 #set($rawAPIData = $rawAPIData.substring(1, $rawAPIDataLength))
 #set($rawAPIData = $rawAPIData.replace(", ", "&"))
#else
 #set($rawAPIData = "")
#end
 
## first we get the number of "&" in the string, this tells us if there is more than one key value pair
#set($countAmpersands = $rawAPIData.length() - $rawAPIData.replace("&", "").length())
 
## if there are no "&" at all then we have only one key value pair.
## we append an ampersand to the string so that we can tokenise it the same way as multiple kv pairs.
## the "empty" kv pair to the right of the ampersand will be ignored anyway.
#if ($countAmpersands == 0)
 #set($rawPostData = $rawAPIData + "&")
#end
 
## now we tokenise using the ampersand(s)
#set($tokenisedAmpersand = $rawAPIData.split("&"))
 
## we set up a variable to hold the valid key value pairs
#set($tokenisedEquals = [])
 
## now we set up a loop to find the valid key value pairs, which must contain only one "="
#foreach( $kvPair in $tokenisedAmpersand )
 #set($countEquals = $kvPair.length() - $kvPair.replace("=", "").length())
 #if ($countEquals == 1)
  #set($kvTokenised = $kvPair.split("="))
  #if ($kvTokenised[0].length() > 0)
   ## we found a valid key value pair. add it to the list.
   #set($devNull = $tokenisedEquals.add($kvPair))
  #end
 #end
#end
 
## next we set up our loop inside the output structure "{" and "}"
{
#foreach( $kvPair in $tokenisedEquals )
  ## finally we output the JSON for this pair and append a comma if this isn't the last pair
  #set($kvTokenised = $kvPair.split("="))
 "$util.urlDecode($kvTokenised[0])" : #if($kvTokenised[1].length() > 0)"$util.urlDecode($kvTokenised[1])"#{else}""#end#if( $foreach.hasNext ),#end
#end
}
```
19. Click the tick next to the "Mapping template" dropdown.
20. Click "<- Method Execution".
21. Click "Deploy API".
22. Set a deployment stage type (eg. Prod , with a description of the deployment). Please note this is saved as part of the deployment history so you want to make this descriptive eventually so later you will know what you did 6 months ago.
23. Click "Deploy".

**Credit:** [AWS Forums](https://forums.aws.amazon.com/thread.jspa?messageID=673012&tstart=0#673012)
