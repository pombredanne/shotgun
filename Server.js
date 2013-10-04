var express = require('express')
,   webshot = require('webshot')
,   types   = require('./types.js')
,   gm      = require('gm')
,   fs      = require('fs');

var preRender = fs.readFileSync('./prerender.js').toString();

var app = express();
app.set('port', process.env.PORT || 3000);
app.set('env', process.env.NODE_ENV || 'production')

// Enable logger in development
if(app.get('env') === 'development')
  app.use(express.logger('dev'));

// Init middlewares and start server
app
  .use(app.router)
  .listen(app.get('port'));

// Healthcheck page
app.get("/healthcheck", function(req, res) {
  res.send(200, 'OK!');
});

// Screenshot pages
app.get("/:type(iphone|ipad|desktop|custom)", function(req, res) {
  if(req.query.url === undefined)
    res.send(500, 'Please provide a url');

  if(req.query.webhook !== undefined)
    res.send('Request for "' + req.query.url + '" received')

  if(req.params.type === 'custom')
    options = req.params;
  else {
    options = types[req.params.type];
    options['shotSize'] = { width: 'all', height: 'all' };
    options['timeout'] = req.query.timeout || 20000;
    options['renderDelay'] = req.query.delay || 1000;
    options['script'] = preRender.replace('%%HEIGHT%%', options.innerHeight);
  }

  webshot(req.query.url, options, function(err, renderStream) {
    var hasData = false;

    if(err) {
      console.log('[ERROR] webshot: ' + err);
    }

    gm(renderStream)
      .resize(options.crop.width)
      .crop(options.crop.width, options.crop.height)
      .resize(options.resize.width, options.resize.height)
      .stream(function (err, stdout, stderr) {
        if(err) {
          console.log('[ERROR] resizer: ' + err);
        }

        stderr.on('data', function(data) {
          console.log(data.toString());
        });

        if(req.query.webhook === undefined) {
          stdout.on('data', function(data) {
            if(!hasData) {
              hasData = true;
              res.contentType("image/png");
            }

            res.write(data);
          });

          stdout.on('end', function(data) {
            if(!hasData)
              res.send(500, 'Something went wrong');
            else
              res.send()
          });
        } else {
          // POST to webhook
          var url = require('url').parse(req.query.webhook);
          if(url.protocol === 'http:' || url.protocol === 'https:') {
            var request = require('request');
            stdout.pipe(request.post(req.query.webhook, function(err) {
              if (err) 
                console.log('[ERROR] webhook:', err.toString());
            }));
          }
        }
      });
  });
});
