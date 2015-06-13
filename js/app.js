// Trianglified header
function drawHeader() {
  var titleHeightFull = document.querySelector('#title').clientHeight;
  var refreshDuration = 10000;
  var refreshTimeout;
  var numPointsX;
  var numPointsY;
  var unitWidth;
  var unitHeight;
  var points;

  var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width',window.innerWidth);
  svg.setAttribute('height',titleHeightFull);
  document.querySelector('#bg').appendChild(svg);

  var unitSize = (window.innerWidth+titleHeightFull)/20;
  numPointsX = Math.ceil(window.innerWidth/unitSize)+1;
  numPointsY = Math.ceil(titleHeightFull/unitSize)+1;
  unitWidth = Math.ceil(window.innerWidth/(numPointsX-1));
  unitHeight = Math.ceil(titleHeightFull/(numPointsY-1));

  points = [];

  for(var y = 0; y < numPointsY; y++) {
      for(var x = 0; x < numPointsX; x++) {
          points.push({x:unitWidth*x, y:unitHeight*y, originX:unitWidth*x, originY:unitHeight*y});
      }
  }

  randomizeHeader();

  for(var i = 0; i < points.length; i++) {
      if(points[i].originX != unitWidth*(numPointsX-1) && points[i].originY != unitHeight*(numPointsY-1)) {
          var topLeftX = points[i].x;
          var topLeftY = points[i].y;
          var topRightX = points[i+1].x;
          var topRightY = points[i+1].y;
          var bottomLeftX = points[i+numPointsX].x;
          var bottomLeftY = points[i+numPointsX].y;
          var bottomRightX = points[i+numPointsX+1].x;
          var bottomRightY = points[i+numPointsX+1].y;

          var rando = Math.floor(Math.random()*2);

          for(var n = 0; n < 2; n++) {
              var polygon = document.createElementNS(svg.namespaceURI, 'polygon');

              if(rando==0) {
                  if(n==0) {
                      polygon.point1 = i;
                      polygon.point2 = i+numPointsX;
                      polygon.point3 = i+numPointsX+1;
                      polygon.setAttribute('points',topLeftX+','+topLeftY+' '+bottomLeftX+','+bottomLeftY+' '+bottomRightX+','+bottomRightY);
                  } else if(n==1) {
                      polygon.point1 = i;
                      polygon.point2 = i+1;
                      polygon.point3 = i+numPointsX+1;
                      polygon.setAttribute('points',topLeftX+','+topLeftY+' '+topRightX+','+topRightY+' '+bottomRightX+','+bottomRightY);
                  }
              } else if(rando==1) {
                  if(n==0) {
                      polygon.point1 = i;
                      polygon.point2 = i+numPointsX;
                      polygon.point3 = i+1;
                      polygon.setAttribute('points',topLeftX+','+topLeftY+' '+bottomLeftX+','+bottomLeftY+' '+topRightX+','+topRightY);
                  } else if(n==1) {
                      polygon.point1 = i+numPointsX;
                      polygon.point2 = i+1;
                      polygon.point3 = i+numPointsX+1;
                      polygon.setAttribute('points',bottomLeftX+','+bottomLeftY+' '+topRightX+','+topRightY+' '+bottomRightX+','+bottomRightY);
                  }
              }
              polygon.setAttribute('fill','rgba(0,0,0,'+(Math.random()/6)+')');
              var animate = document.createElementNS('http://www.w3.org/2000/svg','animate');
              animate.setAttribute('fill','freeze');
              animate.setAttribute('attributeName','points');
              animate.setAttribute('dur',refreshDuration+'ms');
              animate.setAttribute('calcMode','linear');
              polygon.appendChild(animate);
              svg.appendChild(polygon);
          }
      }
  }

  refreshHeader();

  function randomizeHeader() {
      for(var i = 0; i < points.length; i++) {
          if(points[i].originX != 0 && points[i].originX != unitWidth*(numPointsX-1)) {
              points[i].x = points[i].originX + Math.random()*unitWidth-unitWidth/2;
          }
          if(points[i].originY != 0 && points[i].originY != unitHeight*(numPointsY-1)) {
              points[i].y = points[i].originY + Math.random()*unitHeight-unitHeight/2;
          }
      }
  }

  function refreshHeader() {
      clearTimeout(refreshTimeout);
      randomizeHeader();
      for(var i = 0; i < document.querySelector('#bg svg').childNodes.length; i++) {
          var polygon = document.querySelector('#bg svg').childNodes[i];
          var animate = polygon.childNodes[0];
          if(animate.getAttribute('to')) {
              animate.setAttribute('from',animate.getAttribute('to'));
          }
          animate.setAttribute('to',points[polygon.point1].x+','+points[polygon.point1].y+' '+points[polygon.point2].x+','+points[polygon.point2].y+' '+points[polygon.point3].x+','+points[polygon.point3].y);
          animate.beginElement();
      }
      refreshTimeout = setTimeout(function() {refreshHeader();}, refreshDuration);
  }
}
window.addEventListener('DOMContentLoaded', drawHeader, false);

// Sticky header
function stickyHeaderInit() {
  Array.prototype.forEach.call(document.querySelectorAll('article.full-article, section.articles, section.tags'), function(el, i){
    el.style.paddingTop = (document.querySelector('header').clientHeight + 50) + 'px';
  });
  stickyHeader();
}
function stickyHeader() {
  var header = document.querySelector('header'),
      sticked = header.classList.contains('sticky');
  if(window.scrollY > 0 && !sticked) {
    header.classList.add('sticky');
  }
  if(window.scrollY < 80 && sticked) {
    header.classList.remove('sticky');
  }
}
window.addEventListener('scroll', stickyHeader, false);
document.addEventListener('DOMContentLoaded', stickyHeaderInit, false);

// Headings' anchors
function headingAnchors() {
  var headings = document.querySelectorAll('h2[id], h3[id], h4[id]');
  Array.prototype.forEach.call(headings, function(el, i){
    var link = document.createElement('a');
    link.setAttribute('name', el.getAttribute('id'));
    link.setAttribute('href', '#' + el.getAttribute('id'));
    el.removeAttribute('id');
    el.appendChild(link);
  });
}
document.addEventListener('DOMContentLoaded', headingAnchors, false);

// Open social links in new tab
function socialLinksInNewTab() {
  var links = document.querySelectorAll('#partager-block a');
  Array.prototype.forEach.call(links, function(el, i){
    el.setAttribute('target', '_blank');
  });
}
document.addEventListener('DOMContentLoaded', socialLinksInNewTab, false);

// Double click on code block to select all
function selectCode() {
  Array.prototype.forEach.call(document.querySelectorAll('pre code'), function(code, index){
    code.addEventListener('dblclick', function(event) {
        var code = event.target;
        if (document.body.createTextRange) { // ms
          var range = document.body.createTextRange();
          range.moveToElementText(code);
          range.select();
        } else if (window.getSelection) { // moz, opera, webkit
          var selection = window.getSelection();
          var range = document.createRange();
          range.selectNodeContents(code);
          selection.removeAllRanges();
          selection.addRange(range);
        }
      },
      false
    );
  });
}
document.addEventListener('DOMContentLoaded', selectCode, false);

// Infinite load
function infiniteLoad() {
  var allPosts = [],
      isFetchingPosts = false,
      shouldFetchPosts = true,
      postsToLoad = document.querySelectorAll('.articles article').length,
      loadNewPostsThreshold = 3000,
      request = new XMLHttpRequest();
  request.open('GET', '/posts.json', true);
  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      var data = JSON.parse(request.responseText);
      if(loader = document.querySelector('.loader')) {
        if(tag = loader.getAttribute('data-tag')) {
          for (var i = 0; i < data["posts"].length; i++) {
            if(data["posts"][i].tags.indexOf(tag) >= 0) {
              allPosts.push(data["posts"][i])
            }
          };
        } else {
          allPosts = data["posts"];
        }
      }
      if(allPosts.length <= postsToLoad) {
        disableFetching();
      }
      document.addEventListener('scroll', scroller, false);
    }
  };
  request.send();

  if(document.querySelectorAll('.loader').length < 1) {
    shouldFetchPosts = false;
  }
  function scroller() {
    if(!shouldFetchPosts || isFetchingPosts) return;
    if(document.body.scrollTop + window.innerHeight + 100 > document.body.offsetHeight) {
      fetchPosts();
    }
  }

  function fetchPosts() {
    if (!allPosts) return;
    isFetchingPosts = true;
    var loadedPosts = 0,
        postCount = document.querySelectorAll('.articles article').length,
        callback = function() {
          loadedPosts++;
          var postIndex = postCount + loadedPosts;

          if(postIndex > allPosts.length-1) {
            disableFetching();
            return;
          }

          if(loadedPosts < postsToLoad) {
            fetchPostWithIndex(postIndex, callback);
          } else {
            isFetchingPosts = false;
          }
        };
    fetchPostWithIndex(postCount + loadedPosts, callback);
  }

  function fetchPostWithIndex(index, callback) {
    var postURL = allPosts[index].url;
    var request = new XMLHttpRequest();
    request.open('GET', postURL, true);
    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        var data = document.createElement('div');
        data.innerHTML = request.responseText;
        var posts = data.querySelectorAll('article');
        Array.prototype.forEach.call(posts, function(post, index){
          if(loader = document.querySelector('.loader')) {
            if(tag = loader.getAttribute('data-tag')) {
              post.setAttribute('data-color', tag);
            }
          }
          document.querySelector('.articles').appendChild(post);
        });
        callback();
      }
    };
    request.send();
  }

  function disableFetching() {
    shouldFetchPosts = false;
    isFetchingPosts = false;
    if(loader = document.querySelector('.loader')) {
      loader.classList.add('end');
    }
  }

}
document.addEventListener('DOMContentLoaded', infiniteLoad, false);