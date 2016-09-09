---
layout: post
title: "Ruby Kaigi 2016 - It's a Wrap!"
---

![Kinkaku-ji](https://d3hs7z89jfjpsh.cloudfront.net/nolim1t.co/20160908/kikakuji-rk2016.png)

Another Ruby Kaigi 2016, came and gone. This is one reason I love being a rubist - Because, I get to do an annual trip to Japan.

This year it was held in Kyoto. One of my First visits to the city. The conference being hosted in Kyoto was a blessing as I got to actually dedicate some time out to travel to Kyoto.

### Day 0

The first day, I decided to do some exploring of the city's attractions and trying some of the local delicacies.

Of course a trip to Kyoto (especially the first time), isn't complete without visiting stuff such as:

* Kinkaku-ji or the Golden Temple
* Kiyomizu-dera Temple (Perfect for the sunset)

![Kinkaku-ji](https://d3hs7z89jfjpsh.cloudfront.net/nolim1t.co/20160908/kinkakuji.png)
![Kiyomizudera](https://d3hs7z89jfjpsh.cloudfront.net/nolim1t.co/20160908/Kiyomizudera.png)

![Okonomiyaki](https://d3hs7z89jfjpsh.cloudfront.net/nolim1t.co/20160908/okonomiyaki.png)

The weather for the first day was perfect, until the evening then the Typhoon type weather started. But then most of the trip would be spent indoors.

### Sponsors

A good conference wouldn't happen without sponsors. My most notable one is TravisCI, which has some cool stickers.

This time, it pays homage to diversity in tech

![TravisCI](https://d3hs7z89jfjpsh.cloudfront.net/nolim1t.co/20160908/travis-ci-diversity-stickers.png)


### Day 1

![Kyoto ICC](https://d3hs7z89jfjpsh.cloudfront.net/nolim1t.co/20160908/kyoto-icc-yicam.png)
![Kyoto ICC](https://d3hs7z89jfjpsh.cloudfront.net/nolim1t.co/20160908/icc-convention-center.png)

![Lets start](https://d3hs7z89jfjpsh.cloudfront.net/nolim1t.co/20160908/rubykaigi-convention.png)

It's showtime. Here are the my notes on the conference (and some pictures)

#### Bento (Day 1)

This conference unlike the 2015 one actually has a Bento sponsor (which is good because theres no food around the area).

The bento art features the Rail map for Kyoto.

![Cover Art](https://d3hs7z89jfjpsh.cloudfront.net/nolim1t.co/20160908/rubykaigi-day1-bento-coverart.png)
![Sushi](https://d3hs7z89jfjpsh.cloudfront.net/nolim1t.co/20160908/rubykaigi-day1-bento.png)

#### Ruby Kaigi Matznote

##### Ruby 3

More on Ruby 3.

* Performance (3x the speed!)
* Concurrency (Guilds, see the talk by Koichi-San)
* Typing (The focus of the keynote)

###### Typing in Ruby (by Matz)

Matz discusses that static Typed language in Ruby 3 would be a possibility to follow the footsteps of Swift, Go, TypeScript. However technology is like a pendulum - it goes back and forth.

He also discusses that hot languages went from non-staticly typed , to staticly typed, but it might come back again so maybe Ruby 3 will remain dynamic typed because of that.

Also, news is that ruby is getting a database.

When will ruby 3 be released? Hopefully by 2020. I'll hold him to that promise.


#### mRuby and Docker

2 types of container apps:
* Docker
* LXC (More understable than docker)

##### drone.io
* Ephemeral CI container backend. Bit theres some issues (see issue #6980)

##### sqale.jp
* LXC based PaaS

##### Cleanup for docker
docker ps -a | grep Exited | awk '{print $1 }' | xargs docker rm -f

##### Haconiwa

* Haconiwa means miniture garden in Japanese
* Installed using [package cloud](http://packagecloud.io)
* Can remove certain capabilities that root traditionally have access to. Because root is dangerous.
* Process is treated as an OS by an developer and controlled by a Ruby DSL
* Haconiwa can provide the abstract layer for resource limitation, namespace, filesystem and kernel.

###### First implementation

* Using CRuby
* Limitations where CRuby is multithreaded but some system calls can't be run in multithreaded mode

###### mRuby implementation

* Haconiwa is created under the mruby-cli layout

###### Summary

* Containers embrace the UNIX philosophy
* mruby is good for cool and well designed APIs

#### GLSL on mruby with OpenFrameworks

* GLSL is a DSL for OpenGL
* mRuby Shader github.com/elct9620/mruby-shady-generator

#### Isomorphic Web Programs in Web Programs

* It's like node.js but without node.js - writing the same language on client and server side
* Called menilite
* Command line: silica new app name (eg. silica new todo-app)
* Advantages: Sgare the same models on client side and server side. Object marshalling (objects are the same)
* Doesn't have validations on server side, but client side should do it for speed.

##### Useful Gems

* bcrypt gem for encrypting passwords

#### Scalable job queue system built with Docker

* Job queue system definition by the speaker. Queue up the task request and then have workers listen for the request.
* Job Queue system: Barbecue (developed by cookpad)
* github.com/cookpad/barbeque (rubygem)
* Components: Built with Serverengine, Execute a job using Docker, Slack notification, Web API, and web console  (register applications, see logs in S3)
* Barbeque worker = serverengine
* Barbeque enqueues to AWS SQS
* Barbeque client gem is also available


##### Amazon SQS
###### Benefits

* Scalable
* High availability

###### Tradeoffs

* There may be deplicate messages
* Maximum queue retry is 900 seconds

##### Gems

* Resque gem (defining the job)
* Resque-web
* delayed_job gem
* delayed_job_web
* Shoryuken gem
* hako (github.com/eagletmt/hako) - Docker deploy gem that deploys to ECS

More information can be found on the [slide deck](https://speakerdeck.com/k0kubun/scalable-job-queue-system-built-with-docker)

### Day 2

![Day 2](https://d3hs7z89jfjpsh.cloudfront.net/nolim1t.co/20160908/rubykaigi-day2-icc.png)

A bit better weather, so maybe lunch outside in the gardens today.

#### Keynote on Refactoring legacy Ruby "Make Refactoring, Great Again"

![Main Hall](https://d3hs7z89jfjpsh.cloudfront.net/nolim1t.co/20160908/rubykaigi-day2-main-hall.png)

* Making it easy to maintaining old things = key to success?
* Refactor = change the design of the code without changing the behavior of the code.
* Legacy code = code we don't like?
* Business priority: Bug fixes (ok to sell because people don't like it when stuff doesn't work), New Features (easiest to sell people like new stuff), Testing (can not sell), Refactoring (very hard to sell)
* Refactoring is hard to show metric wise, and have to code freeze.

##### How to sell refactoring

* Absorb the cost. Add the time to the development. Best because theres little miscommunication.
* Add it in to development roadmap as technical debt fixes. However it may make the business blame the developers more for implementing shitty code.

##### How to make refactoring less expensive

* Refactoring patterns (Extract, pull up / push down, split loop)
* Characterization testing. Treat the code as a black box, create a test harness, and send random inputs and get outputs and record it. Use the test harness to understand how it works. Then delete the Characterization test after.
* A/B Testing. Redirect people to the old code and some to the new code. Downside: Experimenting on humans is risky.
* "Make the change easy, then make the easy change"


##### Books for refactoring

* 99 Bottles of OOP

##### Gems

* "suture" gem testdouble/suture (Do not put in in the Gemfile). Useful for testing old functions. Released on the date of the keynote September 9th 2016!


### Day 3

What happened day 3

### Key Takeaways from the conference

This can only be entered on the last day
