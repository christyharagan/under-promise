Under Promise
=======

Overview
------

Make [lo-dash](http://lodash.com) play nice with promises. Extends the functionality of lo-dash to work on promises of
collections, collections of promises, mixed collections (some promises, some not), and any combination of the above.

Works with any Promises/A+ implementation, including es6-promises. By default, uses [bluebird](https://github.com/petkaantonov/bluebird).

Usage
------

Install:

```
npm install under-promise
```

Basic usage:

```javascript
var _ = require('under-promise');

var array_of_promises = [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)];

function addOne = function(num) {
  return num + 1;
}

var new_array_of_promises = _.thenMap(array_of_promises, addOne);

// prints [2, 3, 4]
_.thenAll(new_array_of_promises, console.log);
```

Or, to mixin the functionality to your own version of lo-dash:

```javascript
require('under-promise/lib/mixin')(_, all);
```

API
------

See [API Documentation](doc/API.md) for full details of implemented functions.

Currently unimplemented methods
------

Not every lo-dash function is currently implemented. In-fact very few are, so it's quickest to check the API docs to see
if your desired function is supported.

Let me know if you want a function added. Patches greatly welcomed! :)


