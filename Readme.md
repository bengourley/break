break.js
=======

A little script that runs in tandem with jQuery and Modernizr to fire events
when certain media queries are entered and exited due to a window resize.

A demo can be found at: http://bengourley.github.com/break/example/

## Dependencies:

This module depends on jQuery (Events) and Modernizr **>=v2.6** (Media query test and matchMedia polyfill).

It is up to you to ensure these dependencies exist. In the example, jQuery is
hotlinked from Google's CDN and a custom build of Modernizr only containing `mq()`
is used. You should do something better in production.

# Usage:

```js
$(window)
  .on('tiny.enter', function () {
    // Do something for tiny screens here
  })
  .on('tiny.exit', function () {
    // Undo the setup for tiny screens here
  })

// Etc... then:
window.addBreakpoint('tiny', '(max-width: 100px)')
```

# Licence
Licenced under the [New BSD License](http://opensource.org/licenses/bsd-license.php)