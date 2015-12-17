---
layout: post
title: "MongoDB Replication and docker"
---

As docker is the hot thing in the systems administration world, and it's also recommended to have replica sets for mongo DB. And also in general on a production environment so your application is 99.9999% available.

Here are some of the things I've learnt when you use docker and mongodb replication.

* The hostname that mongod generates isn't very useful. You have to change this.
* None of the guides out there are too useful, or show you how to do docker on the same box (which defeats the purpose of replication, but hey its a good dev environment).

So here is my steps

1. Define folder for where the data is to be stored (i.e. /data/mongo1 , /data/mongo2)
2. Define replica set name (ie. rs0)
3. Start up all docker instances
4. Connect to one of the servers (i.e. mongo1)
5. Do a rs.initiate()
6. Do a cfg = rs.conf()
7. set cfg.members[0].host to the external address (or address thats visible to your other mongo DB instances) for the server that you did a rs.initiate() on
8. Do a rs.reconfig(cfg)
9. rs.add() on all the other mongo instances from wthe server you did rs.initiate() on
10. Make a change on mongo1 and ensure that the data is replicated across to mongo2.
