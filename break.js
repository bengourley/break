(function () {

  // Cache the window object and create
  // an empty list of breakpoints
  var o = $(window)
    , breakPoints = []
    , matchMedia = window.Modernizr.mq

  /*
   * Construct a BreakPoint, given a name
   * and a media query.
   */
  function BreakPoint(name, media) {
    this.name = name
    this.media = media
    this.matches = null
  }

  /*
   * Check if the breakpoint's media query
   * matches the window's current state.
   * Trigger events on the window accordingly.
   */
  BreakPoint.prototype.check = function () {

    if (this.matches === null) {
      if (matchMedia(this.media)) {
        o.trigger('enter.' + this.name)
        this.matches = true
      } else {
        o.trigger('exit.' + this.name)
        this.matches = false
      }
      return this
    }

    if (matchMedia(this.media) && !this.matches) {
      o.trigger('enter.' + this.name)
      this.matches = true
      return this
    }

    if (!matchMedia(this.media) && this.matches) {
      o.trigger('exit.' + this.name)
      this.matches = false
      return this
    }

    return this

  }

  /*
   * Add a breakpoint
   */
  function add(name, media) {
    // Only run on browsers that support media queries
    if (!window.Modernizr.mq('(min-width:0px)')) return
    breakPoints.push(new BreakPoint(name, media).check())
  }

  // Check if the breakpoints
  // match on window#resize
  if (window.Modernizr.mq('(min-width:0px)')) {
    o.on('resize', function () {
      $.each(breakPoints, function () {
        this.check()
      })
    })
  }

  // Make public
  window.addBreakpoint = add

}())