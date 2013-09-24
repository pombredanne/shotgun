module.exports = {
  'iphone' : {
    userAgent: 'Mozilla/5.0 (iPhone; U; CPU like Mac OS X; en) AppleWebKit/420+',
    screenSize: { width: 320, height: 480 }, 
    crop: { width: 320, height: 415 }, 
    resize: { width: 114, height: 148 }
  },
  'ipad' : {
    userAgent: 'Mozilla/5.0 (iPad; U; CPU like Mac OS X; en) AppleWebKit/420+',
    screenSize: { width: 1024, height: 768 }, 
    crop: { width: 1024, height: 768 }, 
    resize: { width: 269, height: 202 }
  },
  'desktop' : {
    screenSize: { width: 1280, height: 1024 }, 
    crop: { width: 1280, height: 727 },
    resize: { width: 190, height: 108 }
  }
}
