var assert = require('assert')
  , createBreakpointManager = require('../..')

describe('break (modern browsers)', function () {

  it('should emit `enter` if the media query is satisfied when added', function (done) {
    var bm = createBreakpointManager()
    bm.on('enter:bp', done)
    bm.add('bp', '(min-width: 0px)')
  })

  it('should emit `exit` if the media query is not satisfied when added', function (done) {
    var bm = createBreakpointManager()
    bm.on('exit:bp', done)
    bm.add('bp', '(max-width: 0px)')
  })

  it ('should emit `enter` when the browser is resized to satisfy the media query', function (done) {
    var bm = createBreakpointManager()
    bm.on('enter:bp', done)
    bm.add('bp', '(max-width: ' + (window.innerWidth - 1) + 'px)')
    alert('make the browser narrower')
  })

  it ('should emit `exit` when the browser is resized to satisfy the media query', function (done) {
    var bm = createBreakpointManager()
    bm.on('exit:bp', done)
    bm.add('bp', '(max-width: ' + window.innerWidth + 'px)')
    alert('make the browser wider')
  })

  it ('should should not call a function passed to `fallback()`', function (done) {
    var bm = createBreakpointManager()
    bm.fallback(function () {
      assert(false)
    })
    setTimeout(done, 50)
  })

})
