// Globals
var feed;

// Functions
function feedArticles(photos) {
  photos.forEach(function (photoSrc) {
    var photo = $("<img />");
    photo.attr("src", photoSrc);

    var article = $("<article />");
    article.append(photo);

    feed.append(article);
  });
}

// On Ready
$(document).ready(function documentIsReady() {
  feed = $("#photos-feed");

  feedArticles(["images/1.jpg", "images/2.jpg", "images/3.jpg"]);
});
