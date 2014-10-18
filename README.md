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

var array_of_promises = [Promise.resolve(1), Promise.resolve(2), 3, 4];

function addOne = function(num) {
  return num + 1;
}

var new_array_of_promises = _.thenMap(array_of_promises, addOne);

// prints [2, 3, 4, 5]
_.thenAll(new_array_of_promises, console.log);
```

Equally supports promises of arrays:

```javascript
var array_of_promises = Promise.resolve([Promise.resolve(1), Promise.resolve(2), 3, 4]);

function addOne = function(num) {
  return num + 1;
}

_.thenMap(array_of_promises, addOne);
```

Error handling:

```javascript

_.thenMap(array_of_promises, addOne)
 .catch(function(e){})
 .finally(function(valueOrError){});
```



Or, to mixin the functionality to your own version of lo-dash and promise library:

```javascript
var _ = require('lodash');
var all = require('rsvp').all;

require('under-promise/lib/mixin')(_, all, true);
```

The last parameter specifies whether a new instance of lo-dash is created to prevent clashes with other packages. Passing
```true``` creates a new instance and mixes the functions into that; passing ```false``` just mixes the functions in the provided instance.

API
------

See [API Documentation](doc/API.md) for full details of implemented functions.

Currently unimplemented methods
------

Not every lo-dash function is currently implemented. In-fact very few are, so it's quickest to check the API docs to see
if your desired function is supported.

Let me know if you want a function added. Patches greatly welcomed! :)


