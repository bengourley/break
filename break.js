module.exports = createBreakpointManager
module.exports.BreakpointManager = BreakpointManager

/*
 * Main use case: instantiate and start
 */
function createBreakpointManager() {
  var bm = new BreakpointManager()
  bm.start()
  return bm
}

var Breakpoint = require('./breakpoint')
  , Emitter = require('events').EventEmitter
  , inherits = require('inherits')
  , match = require('./match-media')

function BreakpointManager() {
  // Call Emitter constructor
  Emitter.call(this)
  // Store a list of breakpoints to watch
  this.breakpoints = []
}

// Backwards compatible inheritance (includes ES3 envs)
inherits(BreakpointManager, Emitter)

/*
 * Add a breakpoint
 */
BreakpointManager.prototype.add = function (name, media) {
  // Only run on browsers that support media queries
  if (!match('only all')) return
  var breakpoint = new Breakpoint(name, media)
  this.breakpoints.push(breakpoint)
  process.nextTick(this.checkSingle.bind(this, breakpoint))
}

/*
 * Run a function if media queries are not supported
 */
BreakpointManager.prototype.fallback = function (fn) {
  // Only run on browsers that support media queries
  if (match('only all')) return
  fn()
}

/*
 * Start listening to window#resize and firing events
 */
BreakpointManager.prototype.start = function () {
  // Only add the listener if matchMedia is supported
  if (!match('only all')) return
  this._boundCheck = this.check.bind(this)
  window.addEventListener('resize', this._boundCheck)
  this.check()
}

/*
 * Stop listening to window#resize
 */
BreakpointManager.prototype.stop = function () {
  if (this._boundCheck) window.removeEventListener('resize', this._boundCheck)
}

/*
 * Check each breakpoint
 */
BreakpointManager.prototype.check = function () {
  this.breakpoints.forEach(this.checkSingle.bind(this))
}

/*
 * Check a single breakpoint
 */
BreakpointManager.prototype.checkSingle = function (breakpoint) {
  switch (breakpoint.check()) {
  case true:
    return this.emit('enter:' + breakpoint.name)
  case false:
    return this.emit('exit:' + breakpoint.name)
  case null:
    return
  }
}

/*
 * Override the event emitter's on() function to take a 3rd argument
 * - a flag as to whether the provided fn should be run if media queries
 * are not available.
 */
BreakpointManager.prototype.on = function (event, fn, isFallback) {
  Emitter.prototype.on.call(this, event, fn)
  if (isFallback) this.fallback(fn)
}
