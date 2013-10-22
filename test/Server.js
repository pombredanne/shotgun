'use strict';

var app = require('../Server.js'),
    express = require('express'),
    request = require('supertest'),
    fixtureApp;

describe('Routes', function () {
  before(function () {
    // Setup fixture static website
    fixtureApp = express()
      .use(express.static(__dirname + '/fixtures/public'))
      .use(app.router)
      .listen(4000);
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

  describe('GET fixture website', function () {
    it('should return 200', function (done) {
      request('http://localhost:4000')
        .get('/test.html')
        .expect(200, done);
    });
  });
});
