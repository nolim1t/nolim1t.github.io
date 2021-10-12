---
layout: post
title: "Sovereignty for chat applications"
---

Finally, I've gotten around to being a little more sovereign when it comes to chat applications and now have my own matrix instance!

You may now message me at [***@nolim1t:matrix.nolim1t.co***](https://matrix.to/#/@nolim1t:matrix.nolim1t.co) on matrix. I'm keeping this instance as a trial for now.

## Steps involved

* Set up a domain name. Ideally the root domain if its possible. Was unable to do this as nolim1t.co is hosted on gitlab pages for the static goodness, and migration and reconfiguring this wasn't something I wanted to do.
* Allocate a directory to store the data and configs. I'm using [***this setup***](https://github.com/nolim1t/synapse-docker-compose) right now. Some hints to improve it is needed. After all this is a learning experience for me right now.
* For full internet access, open ports 443 and 8448 (this should ideally by secured by TLS/SSL)
* Run the docker-compose
* Set up certbot

```bash
certbot-auto certonly --email your@email.address -d your.domain.here
```

* Set up nginx (Add a matrix.conf to ***/etc/nginx/conf.d***)

### Configuration contents

#### Notes

* Replace ```your.domain.here``` with your domain
* Add another listener at 8448 for federation with other servers

```
server {
    listen [::]:443 ssl; # managed by Certbot
    listen 443 ssl; # managed by Certbot

    listen [::]:8448 ssl default_server;
    listen 8448 ssl default_server;

    server_name your.domain.here;

    location ~* ^(\/_matrix|\/_synapse\/client) {
        proxy_pass http://localhost:8008;
        proxy_set_header X-Forwarded-For $remote_addr;
        proxy_set_header X-Forwarded-Proto $scheme;
	    proxy_set_header Host $host;

        client_max_body_size 50M;
    }

    ssl_certificate /etc/letsencrypt/live/matrix.nolim1t.co/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/matrix.nolim1t.co/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

}
server {
    if ($host = your.domain.here) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


    listen 80;
    listen [::]:80;
    server_name your.domain.here;
    return 404; # managed by Certbot


}
```

... and you're done! You should be able to connect to your flashy matrix instance and join chats.

Oh and you might want to also do a ```/etc/init.d/nginx configtest``` before restarting it to make sure you don't mess things up too badly.

## Next steps

The default configuration seems to omit public registrations, but I think I'll keep the instance private. Public requires more admining and care.

To register a user, use the [```register_new_matrix_user(1)```](https://manpages.debian.org/testing/matrix-synapse/register_new_matrix_user.1.en.html) command.

## Final Crosscheck

Try to join your instance and then start chatting away. You may also find me on [my own matrix channel](https://matrix.to/#/%23thebarrenschat:matrix.nolim1t.co) which you can ask questions. I'll keep it unmoderated (post whatever conspiracy theories about COVID / Vaccines / 9-11 / etc, I don't care.). As long as you don't post scams / HYIP / MLM / Shitcoins, will keep the post.
