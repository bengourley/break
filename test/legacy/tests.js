var assert = require('assert')
  , createBreakpointManager = require('../..')

describe('break (legacy browsers)', function () {

  it('should not add any breakpoints', function () {
    var bm = createBreakpointManager()
    bm.add('foo', 'mq')
    assert.equal(0, bm.breakpoints.length)
  })

  it('should run a fallback `fn()`', function (done) {
    var bm = createBreakpointManager()
    bm.fallback(done)
  })

  it('should support the `isFallback` argument to `.on()`', function (done) {
    var bm = createBreakpointManager()
    bm.on('foo', done, true)
  })

})
