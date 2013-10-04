function() {
  function getYPosition(element) {
      var yPosition = 0;
    
      while(element) {
          yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
          element = element.offsetParent;
      }
      return yPosition;
  }

  var toDelete = [];

  function traverse(element) {
    for(var i = element.children.length-1; i >= 0; i--) {
      var child = element.children[i];
      if(getYPosition(child) > %%HEIGHT%%) {
        toDelete.push(child);
      } else {
        traverse(child);
      }
    }
  }

  var doDelete = function() {
    traverse(document.body);

    toDelete.forEach(function(element) {
      element.parentNode.removeChild(element);
    });
    toDelete = [];
  };

  setInterval(doDelete, 500);
  doDelete();

  return;
}