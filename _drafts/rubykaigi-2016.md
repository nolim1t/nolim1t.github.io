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
![The Foyer](https://d3hs7z89jfjpsh.cloudfront.net/nolim1t.co/20160908/kyoto-icc-foyer.png)

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


#### Writing A Gameboy Emulator in Ruby

* The talk featured how to emulate different parts of the gameboy such as the CPU, memory, and GPU as Ruby classes in great detail.
* Code found at: https://github.com/colby-swandale/waterfoul

#### Big Data support with rubygems.org

* Talk explained how to use github repo data, and ruby gems data to get the popularly used gems to better support the Google Cloud platform.
* Uses Google BigQuery to do this. You have to get the data into Google BigQuery before you can do this (CSV import)
* "Rubyists are most consistent on Spaces vs Tabs" #bigdata

##### Gems

* gcloud gem: Formally known as google-cloud.

#### Bento (Day 2)

The bento sponsor for day 2 is ESM (Eiwa System Management). There's a hidden message if you try to run the code written on the bento box too ;)

![Bento Cover](https://d3hs7z89jfjpsh.cloudfront.net/nolim1t.co/20160908/day2-bento-cover.png)
![Bento Food](https://d3hs7z89jfjpsh.cloudfront.net/nolim1t.co/20160908/day2-bento-food.png)

![Outside](https://d3hs7z89jfjpsh.cloudfront.net/nolim1t.co/20160908/kyoto-icc-day-2-pond.png)
![Swan](https://d3hs7z89jfjpsh.cloudfront.net/nolim1t.co/20160908/kyoto-icc-day-2-pond-swan.png)

![Swan 2](https://d3hs7z89jfjpsh.cloudfront.net/nolim1t.co/20160908/kyoto-icc-day-2-pond-swan-2.png)

##### The book line

Also noted this at the book queue. Best way of communicating in an international Ruby Conference.

![End of the line](https://d3hs7z89jfjpsh.cloudfront.net/nolim1t.co/20160908/day-2-end-of-the-line.png)
![End of the line 2](https://d3hs7z89jfjpsh.cloudfront.net/nolim1t.co/20160908/day-2-end-of-the-line-2.png)

#### Lonely Operator &. (Ruby 2.3) talk (@ericweinstein at github/twitter)

* Similar to ? or Optionals in Swift
* Object#try in ActiveSupport works too but the library is quite big if you only need that.
* Slides available on [speakerdeck](https://speakerdeck.com/ericqweinstein/a-nil-device-a-lonely-operator-and-a-voyage-to-the-void-star)

##### A World Without non-staticly

Meaningless states wouldn't be representable,  but meaningless states show up all the time. Such as a person with date of birth and date of death. Someone still alive would not have a date of death.

##### TLDR

* Nil is powerful, dangerous, and ubiquitous.
* Use &. so that you don't cause errors/exceptions.

#### Web Server concurrency

* github.com/engineyard/rubykaigi2016-concurrency
* fork in multi process doesn't work on Jruby or Windows

##### Web servers

* Mongrel is unmaintained
* Swiftiply (event driven using EventMachine). Works like an reverse proxy
* Puma runs on the backbones of mongrel. Thread based. And fast. It's based on thin.
* Passenger is common in the rails world. multiprocess.
* Unicorn is not fast but stable.
* ServerEngine (Spoken at RubyKaigi 2016)

##### Gems

* [Scrawls](https://github.com/wyhaines/scrawls)

#### Pwrake: Distributed Workflow Engine based on Rake (@masa16tanaka)

[![PW Rake](https://d3hs7z89jfjpsh.cloudfront.net/nolim1t.co/20160908/prake-structure-thumb.png)](https://d3hs7z89jfjpsh.cloudfront.net/nolim1t.co/20160908/prake-structure-full.png)


* Rubygem location: github.com/masa16/pwrake
* Uses Fiber. Because threads are limited (see **ulimit -u**). Hard to find the reason for deadlocks. Faster, but just need to wait for I/O from worker nodes. Easier to code.
* Uses Rake for the definition language
* Use seki/bartender gem for Asynchronous I/O
* [Gfarm filesystem](https://sourceforge.net/projects/gfarm/) - Designed for wide area file system.
* NICT Science cloud is the GFarm file system to do file processing
* Subaru Telescope uses gfarm and prake to process a large amount of data quickly.

#### FluentD plugin system (@tagomoris)

![FluentD Logo](https://d3hs7z89jfjpsh.cloudfront.net/nolim1t.co/20160908/fluentd.png)

* msgpack-inspect written by speaker for reading binaries
* Black Magic = Metaprogramming in Programming
* Fluent v0.14 released
* Logo change! (Add logo from phone camera)
* New plugin namespace
* Plugin base class for common methods
* Plugin call stack is different

#### JRuby (@tom_enebo)

* JRuby 9.1.4.0 = 2.3 compatible (so can use &.)
* FORA (Fix Once, Run Anywhere). JRuby 9000.
* OORA (Optimized Once, Run Anywhere)

### Day 3

#### Ruby Committers vs the World

[![Ruby Committers](https://d3hs7z89jfjpsh.cloudfront.net/nolim1t.co/20160908/RubyCommitters.png)](https://d3hs7z89jfjpsh.cloudfront.net/nolim1t.co/20160908/RubyCommitters-Full.png)

* 2 new committers joined since December 2015
* Bundler and RubyGems will be one tool.
* Ruby 3 will remain compatible to 2, unlike Python 3 which breaks compatible.
* If you use Japanese in environment variables, be prepared for possible breakage as there will be a change in encoding (Windows only)
* A question was asked about a SVN -> Github (or git in general), but theres a lot of commit scripts which still is SVN dependent. Although pull requests can be still received from github.
* There's talk about a rvm / rbenv type package manager may be incorporate, but it may be out of scope.
* Ruby committers would like to see younger developers to keep it going.
* Question: Package management library for specifying versions for linked C libraries. However it's difficult because different operating systems handle its database differently.
* Ruby 2.4 is released in Ruby Kaigi

#### Web Clients for Ruby and What they should be in the future (@tkawa)

* Many ruby HTTP clients available. 2 different HTTP clients in the standard library.
* Many gems are dedicated to each web API, except they are tailored specific to it but you have to read the gems documentation rather than the web API.
* Faraday gem. HTTP client that wraps the net/http library. Very familiar with rack middleware. There is some Faraday adapters that connect directly to rack.
* Build a gem as a Faraday middleware so code is more reusable.
* Faraday works like a web browser where there is inbuilt schemes

##### Frameworks mentioned in the talk

* [Grape Framework](https://github.com/ruby-grape/grape)

##### Gems that the speaker has built

* faraday-navigation : Go back and forward, follow and link, fill in parameters. Use link header from RFC5988 amd URI template from RFC6570
* faraday-link-extractor : Extract links from APIs and convert them to a link header. Theres a github compatible extractor.

##### Conclusion

* APIs should be self documented.
* APIs should be easy to use.
* APIs should be designed with RFC standards
* Build components on a common interface like Faraday

#### Deletion Driven Development: Code to delete code! (@chrisarcand)

* Programmatically delete code
* Parse ruby code
* Build method parser
* Build dead method finder. WarningL: Ruby is complex so you might need to add edge cases.
* [Ruby Gem Debride]( https://github.com/seattlerb/debride): Ruby dead method processor.  Runs against a dir or file. Can be used in a commit hook?
* [olde_code_finder](https://github.com/tcopeland/olde_code_finder) : Ruby gem to check code content by date and authorship.
* [unused](https://github.com/joshuaclayton/unused) : Haskell to utilize ctags to find unused code.

##### Gems

* ruby_parser (Put it in a format that we can work with)

#### Day 3 lunch

Today (last day) doesn't have a special mention to any of the big sponsors.

![Cover](https://d3hs7z89jfjpsh.cloudfront.net/nolim1t.co/20160908/day3-bento-cover.png)
![Food](https://d3hs7z89jfjpsh.cloudfront.net/nolim1t.co/20160908/day3-bento-food.png)

#### Recent Advances in HTTP and Controlling them using ruby

##### Summary
* http/2 is becoming popular
* TLS/1.3 and QUIC also are upcoming specs
* H2O is configured using mruby

##### Why use HTTP/2

* latency
* HTTP/2 to conceallatency by raising Concurrency. 6 concurrent requests in HTTP/1 and 100 in HTTP/2

##### Key features

* Header compression
* Multiplexing and prioritization
* HTTP Push

##### Header Compression

* 90% reduction in the median for Compression
* Works well

##### Multiplexing and prioritization

* Client gives hint on priority

##### HTTP Push

* 20-30% speedup onpage render time
* Unnecessary pushes?
* Render time increased due to some anti-patterns
* Consider preload instead of pushes
* How to push from CDN?

##### Ideal HTTP Transaction

[![Ideal HTTP Transaction](https://d3hs7z89jfjpsh.cloudfront.net/nolim1t.co/20160908/ideal-http-transaction-small.png)](https://d3hs7z89jfjpsh.cloudfront.net/nolim1t.co/20160908/ideal-http-transaction-big.png)

##### In Reality

[![In Reality](https://d3hs7z89jfjpsh.cloudfront.net/nolim1t.co/20160908/reality-http-transaction-small.png)](https://d3hs7z89jfjpsh.cloudfront.net/nolim1t.co/20160908/reality-http-transaction-big.png)

##### Hidden Resources

* CSS @import or document.write() in javascript
* Still an anti-pattern in HTTP/2, and also an anti-pattern in HTTP/1.

##### Server Side push

###### How to push

* Use rel=preload (Apache, H2, Cloudflare, nghttp2)
* Use **rel=preload; nopush** to opt-out
* W3C is working on the standard for push

###### How to push while processing requests


[![Push while processing requests](https://d3hs7z89jfjpsh.cloudfront.net/nolim1t.co/20160908/http2-push-while-proccessing-request-small.png)](https://d3hs7z89jfjpsh.cloudfront.net/nolim1t.co/20160908/http2-push-while-proccessing-request-full.png)

* Supported in H2O 2.1

##### Using mruby for other stuff

[![mruby for other stuff](https://d3hs7z89jfjpsh.cloudfront.net/nolim1t.co/20160908/other-h2o-stuff-mruby-small.png)](https://d3hs7z89jfjpsh.cloudfront.net/nolim1t.co/20160908/other-h2o-stuff-mruby.png)

* Authentication
* DoS control

##### Avoid negative effect by push

* Don't push unless cache-aware
* Only push resources that block rendering (i.e. CSS/Javascript)
* You can do img src=data-uri if its small and don't have to refresh the images.


#### Ruby Concurrency compared (@anildigital)

##### Key takes

* Node.js is good for fast IO, but for CPU use another technology
* Ruby uses fibers, so you don't need to worry about OS threads
* Fibers is still on a single thread
* Ruby does Multiprocessing (fork) and Multithreading (Thread)
* Threads require less overhead

Add image for fibers (explanation)

#### Closing Remarks
