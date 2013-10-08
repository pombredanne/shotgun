var http = require('http')
  , qs = require('querystring');

function Benchmark(settings) {
  if(typeof settings.baseUrl === 'undefined') {
    throw new Error('baseUrl mandatory');
  }
  this.baseUrl = settings.baseUrl;

  if(typeof settings.paths === 'undefined') {
    throw new Error('paths array mandatory');
  }
  this.paths = settings.paths;

  this.port = (typeof settings.port !== 'undefined') ? settings.port : 80;
  this.timeout = (typeof settings.timeout !== 'undefined') ? settings.timeout : 60*1000;

  this.urlSleep = (typeof settings.urlSleep !== 'undefined') ? settings.urlSleep : 10000;
  this.pathSleep = (typeof settings.pathSleep !== 'undefined') ? settings.pathSleep : 1000;
}

Benchmark.prototype.fire = function(urls) {
  var self = this;

  urls.forEach(function(url, i) {
    setTimeout(function() { 
      self._runUrl(url);
    }, i*10000);
  });
}

Benchmark.prototype._runUrl = function(url) {
  var self = this;

  this.paths.forEach(function(path, i) {
    setTimeout(function() { 
      self._req(url, path, function(msg) {
        console.log(msg);
      })
    }, i*1000);
  });
}

Benchmark.prototype._req = function(url, path, callback) {
  var params = {
      url: url
    , timeout: this.timeout
  }
  var options = {
      host: this.baseUrl
    , port: this.port
    , path: '/' + path + '?' + qs.stringify(params)
    , agent: false
  }

  var self = this
    , start = Date.now();

  var req = http.request(options, function(res){
    if (res.statusCode === 200) {
      callback(self._markupOutput("OK", path, url, start));
    }
    else {
      callback(self._markupOutput("FAIL", path, url, start));
    }
  }).on('error', function(error) {
    callback(self._markupOutput("ERR", path, url, start, new String(error)));
  }).end();
}

Benchmark.prototype._markupOutput = function(state, path, url, start, err) {
  var now = Date.now();

  return [
      "OK"
    , path
    , url
    , new Date(start).toLocaleTimeString("en-US", {hour12: false})
    , new Date(now).toLocaleTimeString("en-US", {hour12: false})
    , now - start
  ].join(',')
}

module.exports = Benchmark;
