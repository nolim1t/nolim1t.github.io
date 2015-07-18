---
layout: post
title: "Coding the world"
---

<h1>{{ page.title }}</h1>
Well well, it's been a while since I've last updated this github blog as theres been so much going on.But this time I'd like to try updating this more on my coding adventures just so I can share what's happening.

The topic I'd like to blog about is "Localization" or "Coding the world" as I call it. As a traveller as well, I do understand and recognize the fact that not everyone speaks english natively so it is important as an app developer to create your apps which give an awesome user experience in someones locale.

There is a lot to care about localization such as:

* Language
* Left to right or right to left
* Date formats
* Colors
* Cultural "faux pas" with certain things (i.e. in China or Japan, avoid using the number 4. But then again staying on the 4th floor in apartment 4 is actually quite cheap in China/Japan)

I'll mostly focus on language, as the others is a bit harder to tackle from a backend point of view for now.

First things first. For a big project of mine, I'm doing a backend (which is the control center, brains or central nervous system to an application).

As the user base speaks Chinese, I'd like to be able to have it support Chinese as well as English at the very basics. Therefore it would actually be nice if the system responses were actually localized properly. From a UX perspective, delight/surprise the user on small details.

An example of this which inspired me to localize a backend was foursquare which has world class UX. When I changed the language of my phone and started using the app, not only the obvious thing of all the UI being in that language, also system notifications were localized too. And going through their API documentation also shows that their actual API is localized.

### How? Use the Accept-Language header for your web framework

This way you don't need to pass any extra API parameters. 

In the express.js framework (which is what I use) you can check against req.acceptsLanguages(languageCode) - as long as you are using the latest version.

In my Application I do this before doing anything else, although you may actually decide to do others. What I do is I check for the language, and if it's not supported I just default to english. Eventually I'd like to actually see what people are using and then perhaps store a tally of languages so you know what to support next

Below is some coffeescript code. I set a variable and then handle it later, although you probably don't need to do this.

~~~ coffeescript
# Language check (http://www.ietf.org/rfc/rfc1766.txt)
	if req.acceptsLanguages('en', 'en-US', 'en-GB')
		language = 'en'
	else if req.acceptsLanguages('zh')
		language = 'zh'
	else if req.acceptsLanguages('ko')
		language = 'ko'
	else if req.acceptsLanguages('ja')
		language = 'ja'
	else
		# Just use english if we can't work it out
		language = 'en'
~~~

### Document your API so that client code will use this header
Never trust the client. 

As a backend architect it's your job to enforce the rules. Just like a bouncer at the door of a nightclub where they enforce a dress code and keep certain riff-raff out.

And It's part of <a href="http://www.ietf.org/rfc/rfc2616.txt">RFC2616</a>, so any good internet citizen who can write client code ideally should send this.

I'll get more on the client code later.


