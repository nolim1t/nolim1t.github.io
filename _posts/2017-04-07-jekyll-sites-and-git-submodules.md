---
layout: post
title: "Jekyll sites on github and git submodule fun"
---

While creating the opensource section of this site, and another (to be announced) section of this site it just came to me - why am I duplicating the same template page and also having to change the template all the time.

Granted I haven't changed the template yet, however I want to add some improvements to it later (mostly for mobile). The thought of having to update it N times (where N is the number of subsites I have) wasn't too appealing. More room for error too. So my solution, work smart not hard!

I figured, hey lets make use of the git submodule for the **_layouts** folder and move all the layouts to a separate project.

I did this, and as a result all works well so far. So essentially, with github you can have a main site and subsites which share the same template. The more you know when you discover problems to be solved!

## The Process

* Set up a new git repository
* Copy all the layouts to that repository
* Then do a **git submodule add** against that repository
* git commit the new changes
* push it and make sure you haven't broken anything

## The End Result

This [repository](https://github.com/nolim1t/nolim1t-co-templates) which is basically the templates for this entire site.

This site's own repository which has a submodule of the abovementioned repository.


