'use strict';

var app = require('../Server.js'),
    request = require('supertest'),
    express = require('express'),
    fixtureApp;


describe('General Routes', function () {
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
});

describe('Generation Routes', function () {
  beforeEach(function () {
    fixtureApp = express()
      .use(express.static(__dirname + '/fixtures/public'))
      .get('/', function (req, res) {
        res.send(200, 'OK');
      })
      .listen(0);
  });

  afterEach(function () {
    fixtureApp.close();
  });

  describe('GET fixture website through loopback', function () {
    it('should return 200', function (done) {
      request(fixtureApp)
        .get('/')
        .expect(200, done);
    });
  });

  describe('GET fixture website through loopback', function () {
    it('should return 200', function (done) {
      request('http://127.0.0.1:' + fixtureApp.address().port)
        .get('/')
        .expect(200, done);
    });
  });

  describe('GET fixture website through loopback', function () {
    it('should return 200', function (done) {
      request('http://127.0.0.1:' + fixtureApp.address().port)
        .get('/test.html')
        .expect(200, done);
    });
  });
});
