'use strict';

var app = require('../Server.js'),
    express = require('express'),
    request = require('supertest');

describe('Routes', function () {
  before(function () {
    // Setup fixture static website
    app
      .use(express.static(__dirname + '/fixtures/public'));
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
      request(app)
        .get('/test.html')
        .expect(200, done);
    });
  });

  describe('GET fixture website through loopback', function () {
    it('should return 200', function (done) {
      request('http://127.0.0.1:3000')
        .get('/test.html')
        .expect(200, done);
    });
  });
});
