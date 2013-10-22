'use strict';

var http = require('http'),
    qs = require('querystring');

function Benchmark(settings) {
  if (typeof settings.baseUrl === 'undefined') {
    throw new Error('baseUrl mandatory');
  }
  this.baseUrl = settings.baseUrl;

  if (typeof settings.paths === 'undefined') {
    throw new Error('paths array mandatory');
  }
  this.paths = settings.paths;

  this.port = (typeof settings.port !== 'undefined') ?
    settings.port : 80;
  this.timeout = (typeof settings.timeout !== 'undefined') ?
    settings.timeout : 60 * 1000;

  this.urlSleep = (typeof settings.urlSleep !== 'undefined') ?
    settings.urlSleep : 10;
  this.urlSleepSeed = (typeof settings.urlSleepSeed !== 'undefined') ?
    settings.urlSleepSeed : 0;
  this.pathSleep = (typeof settings.pathSleep !== 'undefined') ?
    settings.pathSleep : 1;
}

function markupOutput(state, path, url, start) {
  var now = Date.now();

  return [
    state,
    path,
    url,
    new Date(start).toLocaleTimeString('en-US', {hour12: false}),
    new Date(now).toLocaleTimeString('en-US', {hour12: false}),
    now - start
  ].join(',');
}

function req(url, path, callback) {
  var params = {
    url: url,
    timeout: this.timeout
  };

  var options = {
    host: this.baseUrl,
    port: this.port,
    path: '/' + path + '?' + qs.stringify(params),
    agent: false
  };

  var start = Date.now();

  http.request(options, function (res) {
    if (res.statusCode === 200) {
      callback(markupOutput('OK', path, url, start));
    }
    else {
      callback(markupOutput('FAIL', path, url, start));
    }
  }).on('error', function () {
    callback(markupOutput('ERR', path, url, start));
  }).end();
}

function runUrl(url, paths, pathSleep) {
  paths.forEach(function (path, i) {
    setTimeout(function () {
      req(url, path, function (msg) {
        console.log(msg);
      });
    }, i * pathSleep * 1000);
  });
}

Benchmark.prototype.fire = function (urls) {
  var seedMin = this.urlSleep - this.urlSleepSeed;
  var seedMax = this.urlSleep + this.urlSleepSeed;

  urls.forEach(function (url, i) {
    setTimeout(function () {
      runUrl(url, this.paths, this.pathSleep);
    },
    i * Math.floor(Math.random() * (seedMax - seedMin + 1) + seedMin) * 1000);
  });
};

module.exports = Benchmark;
