//var page = require('webpage').create();
var page = new WebPage();

page.viewportSize = {
  width: 320
, height: 480
};

// page.clipRect = {
//   top: 0
// , left: 0
// , width: 320
// , height: 480
// };

page.settings.userAgent = 'Mozilla/5.0 (iPhone; U; CPU like Mac OS X; en) AppleWebKit/420+';
page.settings.javascriptEnabled = true;
page.settings.XSSAuditingEnabled = true;
page.settings.localToRemoteUrlAccessEnabled = true;


page.open('http://google.com/', function () {
  window.setTimeout(function () {
    page.render('output.png');
    page.close();
    page.release();
    phantom.exit();
  }, 2000);
});