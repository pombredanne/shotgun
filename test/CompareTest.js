'use strict';

var app = require('../Server.js'),
    request = require('supertest'),
    expect = require('chai').expect,
    express = require('express'),
    gm = require('gm'),
    fs = require('fs'),
    types = require('../types.js'),
    fixtureApp;

function parseToBinary(res, callback) {
  res.setEncoding('binary');

  res.data = '';
  res.on('data', function (chunk) {
    res.data += chunk;
  });

  res.on('end', function () {
    callback(null, new Buffer(res.data, 'binary'));
  });
}

describe('Server', function () {
  var tmpPath = __dirname + '/tmp-cache',
      resultPath = tmpPath + '/result.png';

  beforeEach(function () {
    fs.mkdirSync(tmpPath);
    fixtureApp = express()
      .use(express.static(__dirname + '/fixtures/public'))
      .use(app.router)
      .get('/', function (req, res) {
        res.send(200, 'OK');
      })
      .listen(0);
  });

  afterEach(function () {
    if (fs.existsSync(resultPath)) {
      fs.unlinkSync(resultPath);
    }
    fs.rmdirSync(tmpPath);
    fixtureApp.close();
  });

  var typeTest = function (type, width, height) {
    describe('GET /' + type + ' screenshot', function () {
      this.timeout(21000);
      it('equals fixture and size ' + width + 'x' + height, function (done) {
        request(app)
          .get(
            '/' + type +
            '?url=' + 'http://127.0.0.1:' + fixtureApp.address().port +
              '/test.html' +
            '&timeout=20000'
          )
          .parse(parseToBinary)
          .end(function (err, res) {
            gm(res.body).size(function (err, size) {
              expect(size.width).to.equal(width);
              expect(size.height).to.equal(height);
            });

            fs.writeFileSync(resultPath, res.body);
            gm.compare(
              resultPath,
              __dirname + '/fixtures/equals/test.html.' + type + '.png',
              function (err, equals, equality) {
                expect(equality).to.be.below(0.1);
                done();
              });
          });
      });
    });
  };

  for (var type in types) {
    typeTest(type, types[type].resize.width, types[type].resize.height);
  }
});
