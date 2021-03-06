# Smart Home Webserver + Raspberry Client

This is the repo for Smart Home Project's webserver files.
I'm really thankful for my ISP since they won't let me open ports so I have to set up a different server then connect both my client & Raspberry Pi to the same server while I could just connect to the server on my Raspberry Pi if I could open a port. _I really hope that_ I will make this compatible with nginx so when you just copy the given nginx config file, the webserver should be directly accessible on port 80. Currently, it uses port 3000 so for example, when you run it on your localhost, you need to connect to `localhost:3000` instead of just `localhost`. _Check out the bottom, all installations are very easy, aren't they?_

## Server Installation

First, run `npm run install:server` command and then run `npm run start:server`. It's easy as this!

## Raspberry Pi Client Installation

Again, firstly, run `npm run install:raspiclient` command and then run `npm run start:raspiclient`.

## Web Client Installation

As all the other ones show, you can predict this one as well. Run `npm run install:webclient` and then run `npm run start:webclient`

## Development

You first need to run installation(s) for the part you want to work on and then you can just run `dev:` instead of `start:` for each part, such as `npm run dev:server`.
