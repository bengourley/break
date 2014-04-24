module.exports = match

require('./match-media-polyfill')

var browserMatchMedia = window.matchMedia || window.msMatchMedia

/*
 * Simplification of the window.matchMedia function
 * to simply take a media query and return a boolean.
 */
function match(mq) {
  if (!browserMatchMedia) return false
  var result = browserMatchMedia(mq)
  return !!result && !!result.matches
}
