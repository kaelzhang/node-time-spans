[![Build Status](https://travis-ci.org/kaelzhang/node-time-spans.svg?branch=master)](https://travis-ci.org/kaelzhang/node-time-spans)
<!-- optional appveyor tst
[![Windows Build Status](https://ci.appveyor.com/api/projects/status/github/kaelzhang/node-time-spans?branch=master&svg=true)](https://ci.appveyor.com/project/kaelzhang/node-time-spans)
-->
<!-- optional npm version
[![NPM version](https://badge.fury.io/js/time-spans.svg)](http://badge.fury.io/js/time-spans)
-->
<!-- optional npm downloads
[![npm module downloads per month](http://img.shields.io/npm/dm/time-spans.svg)](https://www.npmjs.org/package/time-spans)
-->
<!-- optional dependency status
[![Dependency Status](https://david-dm.org/kaelzhang/node-time-spans.svg)](https://david-dm.org/kaelzhang/node-time-spans)
-->

# time-spans

<!-- description -->

## Install

```sh
$ npm install time-spans --save
```

## Usage

```js
const {
  Second,
  Minute,
  Minute5,
  Minute15,
  Minute30,
  Minute60,
  Day,
  Week,
  Month
} = require('time-spans')

// Gets the nearest 15-minute breakpoint
const m15 = new Minute15(new Date(2016, 9, 1, 7, 50))

// deepEqual to `new Date(2016, 9, 1, 7, 45)`
m15.time()

// 15 minutes after
m15.next()

// 15 minute before
m15.prev()

// 15 * 3 minutes after
m15.offset(3)
```

## new {Constructor}(time)

- **time** `String|Date|Number.<timestamp>` the initial value of the time.

### time()

returns `Date`, the real date.

### next()

returns `Date`, the next time span

### prev()

returns `Date`, the previous time span

### offset(delta)

returns `Date`, the `delta`-time time span relative

## License

MIT
