# Break

Know when breakpoints are entered/exited due to a window resize.

# Installation

If you are sane and use npm:

```
npm install break
```

If you are not sane, grab the bundled standalone version at [standalone/break.min.js](standalone/break.min.js).
Including this on your page will assign `window.createBreakpointManager`.

# Usage

```js
var createBreakpointManager = require('break')

var bm = createBreakpointManager()

bm.add('portable', '(max-width: 800px)')

bm.on('enter:portable', function () {
  // Set up functionality relating to small screens e.g…
  createTouchSlider()
})

bm.on('exit:portable', function () {
  // Tear down functionality relating to small screens e.g…
  removeTouchSlider()
})
```

# API

### var bm = createBreakpointManager()

Create a breakpoint manager. `bm` inherits from the [node event emitter](http://nodejs.org/api/events.html#events_class_events_eventemitter) so it has the same API in addition to the methods below.

The following events are emitted by this module:
- `enter:[breakpoint]` - when a breakpoint is entered, e.g `enter:portable`
- `exit:[breakpoint]` - when a breakpoint is exited, e.g `exit:wide`

### bm.add(name, mq)

Add a breakpoint with a name and a media query. On every window resize event, the media
query will be tested. If the result changes to `mq` being satisfied, the event `enter:[name]`
will be emitted. If the result changes such that `mq` is no longer satisfied, the event
`exit:[name]` will be emitted. If no change occurs, no events are emitted (as this would
be chaos on every window resize event!).

The media query is also tested once when it is added, as it is often helpful to know whether
the `mq` is satsfied at this point. This check happens on `process.nextTick()` so that
it does not matter whether you add the listeners (with `.on()`) before or after you add the
breakpoints (with `.add()`).

### bm.on(event, name, isFallback)

This function delegates the first two arguments to the event emitter [`.on()`](http://nodejs.org/api/events.html#events_emitter_on_event_listener). The third argument is a flag as to whether this function
should run once if media queries are not supported.

### bm.fallback(fn)

Runs the function `fn` if media queries are not supported.


# Development

This is quite a simple module, however it's annoyingly tricky to test. However,
this has been acheived by having two browser test suites – `modern` and `legacy`.
The caveat is that these tests have to run in a browser by hand.

All bug fixes and features require that (if possible) test is added which fails
before the implementation of the new code, and passes afterwards.

## Check out a development version

```
git clone git@github.com:bengourley/break.git
cd break
npm install
```

## Run the tests

### For modern browsers

These tests must pass in IE9+, Firefox, Safari and Chrome

```
npm test
```

Then use link presented in the terminal to run the tests in various browsers.
You will be prompted to resize your browser at points during the test.


### For legacy browsers

These tests must pass in IE6,7 and 8

```
npm run test-legacy
```

As above, use the link to the tests in various browsers.
