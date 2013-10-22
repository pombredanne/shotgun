module.exports = {
  'iphone' : {
    /* jshint maxlen:120 */
    userAgent: 'Mozilla/5.0 (iPhone; U; CPU like Mac OS X; en) AppleWebKit/420+',
    screenSize: { width: 320, height: 480 },
    innerHeight: 1409,
    crop: { width: 320, height: 415 },
    resize: { width: 114, height: 148 }
  },
  'ipad' : {
    userAgent: 'Mozilla/5.0 (iPad; U; CPU like Mac OS X; en) AppleWebKit/420+',
    screenSize: { width: 1024, height: 768 },
    innerHeight: 768,
    crop: { width: 1024, height: 768 },
    resize: { width: 269, height: 202 }
  },
  'desktop' : {
    screenSize: { width: 1280, height: 1024 },
    innerHeight: 1024,
    crop: { width: 1280, height: 727 },
    resize: { width: 380, height: 216 }
  }
};
