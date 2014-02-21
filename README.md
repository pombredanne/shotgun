Shotgun [![Build Status](https://travis-ci.org/Woorank/shotgun.png?branch=master)](https://travis-ci.org/Woorank/shotgun) [![Coverage Status](https://coveralls.io/repos/Woorank/shotgun/badge.png)](https://coveralls.io/r/Woorank/shotgun)
=======

Service to generate screenshots of webpages.

## Getting Started

### Define types 
Define your screenshot types in the types.js file.
```node
module.exports = {
  'type' : {
    userAgent: '...',
    screenSize: { width: 320, height: 480 },
    innerHeight: 1409,
    crop: { width: 320, height: 415 },
    resize: { width: 114, height: 148 }
  },
  ...
};
```
* `userAgent` UserAgent string of the browser to mimick
* `screenSize` Screen size of the browser to mimick
* `innerHeight` Define the fold height (in normal cases this is equal to the screenSize.height, but for example iphone is returning an unexpected value to the browser)
* `crop` Box in which to crop the rendered website screenshot
* `resize` Final size we resize the screenshot to

### Run the server 
To run the server use this command:

`NODE_ENV=production PORT=80 node Server.js`

## Usage

`GET` `curl http://localhost/:type?url=:url&timeout=:timeout&delay=:delay&webhook=:webhook`

* `:type` the type name defined in types.js
* `:url` url of the website you want to create a screenshot from (eg. "https://google.com" or "cnn.com")
* `:delay` (Optional) Amount of time (in ms) the server must wait after rendering the page, when generating the screenshot (default: 1000)
* `:timeout` (Optional) Amount of time (in ms) the server tries generating the screenshot, before it times out (default: 20000)
* `:webhook` (Optional) Webhook to which the image PNG data is `POST`'ed in the response body when generated. When a webhook is defined, the server will immediately return a `200` response. Errors after firing the requests are ignored. (default: `null`)

## Advanced

### Prerender

When you want to execute a specific javascript while rendering the webpage, you can define that in the prerender folder and load from the server.

Example:
`remove-belowfold-images.js`: remove all images under the screen fold

## Acknowledgements

* [Express](http://expressjs.com/)
* [Webshot](https://github.com/brenden/node-webshot)
* [GraphicsMagick for node.js](http://aheckmann.github.io/gm/)
