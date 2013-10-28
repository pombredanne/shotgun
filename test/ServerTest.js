'use strict';

var app = require('../Server.js'),
    request = require('supertest'),
    express = require('express'),
    fixtureApp;

describe('Server', function () {
  describe('General Routes', function () {
    describe('GET /', function () {
      it('should return 404', function (done) {
        request(app)
          .get('/')
          .expect(404, done);
      });
    });

    describe('GET /healthcheck', function () {
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
        .use(app.router)
        .get('/', function (req, res) {
          res.send(200, 'OK');
        })
        .listen(0);
    });

    afterEach(function () {
      fixtureApp.close();
    });

    describe('GET fixture /', function () {
      it('should return 200', function (done) {
        request(fixtureApp)
          .get('/')
          .expect(200, done);
      });
    });

    describe('GET fixture / through loopback', function () {
      it('should return 200', function (done) {
        request('http://127.0.0.1:' + fixtureApp.address().port)
          .get('/')
          .expect(200, done);
      });
    });

    describe('GET fixture /test.html', function () {
      it('should return 200', function (done) {
        request('http://127.0.0.1:' + fixtureApp.address().port)
          .get('/test.html')
          .expect(200, done);
      });
    });

    describe('GET /desktop without url', function () {
      it('should return 400', function (done) {
        request(app)
          .get('/desktop')
          .expect(400, done);
      });
    });

    describe('GET /desktop with immediate (1ms) timeout', function () {
      this.timeout(200);
      it('should return 500', function (done) {
        request(app)
          .get(
            '/desktop?url=' + 'http://127.0.0.1:' + fixtureApp.address().port +
            '&timeout=1'
          )
          .expect(500, done);
      });
    });

    describe('GET /desktop with delay longer than timout', function () {
      this.timeout(1000);
      it('should return 500', function (done) {
        request(app)
          .get(
            '/desktop?url=' + 'http://127.0.0.1:' + fixtureApp.address().port +
            '&timeout=200' +
            '&delay=400'
          )
          .expect(500, done);
      });
    });

    describe('GET /desktop screenshot', function () {
      this.timeout(21000);
      it('should return 200 and Content-Type \'image/png\'', function (done) {
        request(app)
          .get(
            '/desktop' +
            '?url=' + 'http://127.0.0.1:' + fixtureApp.address().port +
              '/test.html' +
            '&timeout=20000'
          )
          .expect('Content-Type', 'image/png')
          .expect(200, done);
      });
    });

    describe('GET /iphone screenshot', function () {
      this.timeout(21000);
      it('should return 200 and Content-Type \'image/png\'', function (done) {
        request(app)
          .get(
            '/iphone' +
            '?url=' + 'http://127.0.0.1:' + fixtureApp.address().port +
              '/test.html' +
            '&timeout=20000'
          )
          .expect('Content-Type', 'image/png')
          .expect(200, done);
      });
    });

    describe('GET /ipad screenshot', function () {
      this.timeout(21000);
      it('should return 200 and Content-Type \'image/png\'', function (done) {
        request(app)
          .get(
            '/ipad' +
            '?url=' + 'http://127.0.0.1:' + fixtureApp.address().port +
              '/test.html' +
            '&timeout=20000'
          )
          .expect('Content-Type', 'image/png')
          .expect(200, done);
      });
    });

    describe('GET /desktop screenshot of unexisting url', function () {
      this.timeout(21000);
      it('should return 500', function (done) {
        request(app)
          .get(
            '/desktop' +
            '?url=http://i.do.not.exist' +
            '&timeout=20000'
          )
          .expect(500, done);
      });
    });
  });
});
