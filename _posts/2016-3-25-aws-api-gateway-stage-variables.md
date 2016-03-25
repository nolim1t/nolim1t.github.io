---
layout: post
title: "AWS API Gateway stage variables"
---

During my discoveries with AWS lambda I figured, I really would like to open source my cool lambda function - however following
the guidelines of **never checking in API keys** I was wondering if it was possible to actually set an environment variable
rather than having to edit out the API keys before committing code like **each time I commit code**.

This was just **not gonna happen**. Open source fully or GTFO.

## Being a lazy devloper is being a good developer
Those are the types that can do more with less.

Enter **stage variables**.

### What is Stage variables?

This is a functionality as part of API gateway, which in time sets the context handler.

### A quick example

```javascript
{
    "inputparameter": "$input.params('someinputparameter')",
    "version": "$stageVariables.get('version')"
}
```

Which translates to a variable as part of **event**.

For those who don't understand, I'll be publishing some actual code soon.
