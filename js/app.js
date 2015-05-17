// Trianglified header
var drawTimeout;
function drawThrottler() {
  if ( !drawTimeout ) {
    drawTimeout = setTimeout(function() {
      drawTimeout = null;
      draw();
     }, 66);
  }
}
function draw() {
  var body    = document.body,
      clight  = getComputedStyle(body)['color'],
      cdark   = getComputedStyle(body)['backgroundColor'],
      canvas  = document.querySelector('#bg'),
      title   = document.querySelector('#title'),
      context = canvas.getContext('2d'),
      colors  = (canvas.classList && canvas.classList.contains('page-home') ? ['#000', '#758', '#d5cdd8', '#758', '#000'] : [cdark, clight, cdark]),
      pattern = Trianglify({
        cell_size: 70,
        variance:  1,
        width:     window.innerWidth,
        height:    title.clientHeight,
        x_colors:  colors
      });
  pattern.canvas(canvas);
}
window.addEventListener('resize', drawThrottler, false);
window.addEventListener('DOMContentLoaded', drawThrottler, false);

// Sticky header
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
document.addEventListener('DOMContentLoaded', stickyHeader, false);

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
  
  var allPosts,
      isFetchingPosts = false,
      shouldFetchPosts = true,
      postsToLoad = document.querySelectorAll('.articles article').length,
      loadNewPostsThreshold = 3000,
      request = new XMLHttpRequest();
  request.open('GET', '/posts.json', true);
  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      var data = JSON.parse(request.responseText);
      allPosts = data["posts"];
      if(loader = document.querySelector('.loader')) {
        if(tag = loader.getAttribute('data-tag')) {
          for (var i = 0; i < allPosts.length; i++) {
            if(allPosts.indexOf(tag) < 0) {
              allPosts.splice(i, 1);
            }
          };
        }
      }
      if(allPosts.length <= postsToLoad) {
        disableFetching();
      }
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
  document.addEventListener('scroll', scroller, false);

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
    document.querySelector('.loader').classList.add('end');
  }
  
}
document.addEventListener('DOMContentLoaded', infiniteLoad, false);