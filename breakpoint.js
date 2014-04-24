module.exports = Breakpoint

var match = require('./match-media')

/*
 * Construct a Breakpoint, given a name
 * and a media query.
 */
function Breakpoint(name, media) {
  this.name = name
  this.media = media
  this.matches = null
}

/*
 * Check if the breakpoint has been entered, exited or neither
 * Return values: true=entered, false=exited, null=neither
 */
Breakpoint.prototype.check = function () {

  // This is the first check
  if (this.matches === null) {
    this.matches = match(this.media)
    return this.matches
  }

  // For all subsequent checks this.matches will be set to true
  // or false, and will only return a boolean if a change happens

  if (match(this.media) && !this.matches) {
    this.matches = true
    return this.matches
  }

  if (!match(this.media) && this.matches) {
    this.matches = false
    return this.matches
  }

  return null

}
