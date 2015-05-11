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
      pattern = Trianglify({
        cell_size: 70,
        variance: 1,
        width: window.innerWidth,
        height: title.clientHeight,
        x_colors:  [cdark, clight, cdark]
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