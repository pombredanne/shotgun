'use strict';

var app = require('../Server.js'),
    request = require('supertest');

describe('Routes', function () {
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
