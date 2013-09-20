var express = require('express'),
    webshot = require('webshot'),
    types   = require('./types.js'),
    gm      = require('gm');

var app = express();
app.set('port', process.env.PORT || 3000);

app
  .use(express.logger('dev'))
  .use(app.router)
  .listen(app.get('port'));

app.get("/:type(iphone|ipad|desktop|custom)", function(req, res) {
  if(req.query.url === undefined)
    res.send(500, 'Please provide a url');

  if(req.params.type === 'custom')
    options = req.params;
  else {
    options = types[req.params.type];
    options['timeout'] = req.query.timeout || 20000;
    options['renderDelay'] = req.query.delay || 0;
  }

  webshot(req.query.url, options, function(err, renderStream) {
    var hasData = false;

    if(err) {
      console.log('[ERROR] webshot: ' + err);
    }

    gm(renderStream)
      .resize(options.resize.width, options.resize.height)
      .stream(function (err, stdout, stderr) {
        if(err) {
          console.log('[ERROR] resizer: ' + err);
        }

        stderr.on('data', function(data) {
          console.log(data.toString());
        });

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
      });
  });
});
