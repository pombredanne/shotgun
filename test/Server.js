'use strict';

var app = require('../Server.js'),
    express = require('express'),
    request = require('supertest'),
    sleep = require('sleep');

describe('Routes', function () {
  before(function () {
    // Setup fixture static website
    express()
      .use(express.static(__dirname + '/fixtures/public'))
      .listen(4000);

    // Give the fixture server time to bind to the socket
    sleep.sleep(3);
  });

  describe('GET root', function () {
    it('should return 404', function (done) {
      request(app)
        .get('/')
        .expect(404, done);
    });
  });

  describe('GET healthcheck', function () {
    it('should return 200', function (done) {
      request(app)
        .get('/healthcheck')
        .expect('OK!')
        .expect(200, done);
    });
  });

  describe('GET fixture website through loopback', function () {
    it('should return 200', function (done) {
      request('localhost:4000')
        .get('/test.html')
        .expect(200, done);
    });
  });
});
