'use strict';

function _then(promise, then) {
  return promise.then(then);
}

function _catch(promise, handleError) {
  return promise.catch(handleError);
}

function _finally(promise, handleFinal) {
  return promise.finally(handleFinal);
}

module.exports = function (_, all) {
  function thenAll(arr, then, deep) {
    var doAll = function (arr) {
      var promise = all(arr).then(function (resolvedArr) {
        if (deep) {
          return _(resolvedArr)
            .thenMap(function (elem) {
              if (_.isArray(elem)) {
                return _.thenAll(elem, null, true);
              } else {
                return elem;
              }
            })
            .thenAll();
        } else {
          return resolvedArr;
        }
      });
      return then ? promise.then(then) : promise;
    };
    if (arr.then) {
      return arr.then(doAll);
    } else {
      return doAll(arr);
    }
  }

  function thenZipObject(props, vals) {
    if (vals) {
      return all([_.thenAll(props), _.thenAll(vals)]).then(Function.apply.bind(_.zipObject, null));
    } else {
      return _.thenAll(props, _.zipObject, true);
    }
  }

  function thenFlatten(array, isShallow, callback, thisArg) {
    return _.thenAll(array, _.partialRight(_.flatten, isShallow, callback, thisArg), true);
  }

  function wrapCallback(method, callback, thisArg, collection) {
    return method(collection, function (value, index, collection) {
      if (value.then) {
        return value.then(_.partialRight(callback, index, collection));
      } else {
        return callback(value, index, collection);
      }
    }, thisArg);
  }

  function wrapMethod(method, collection, callback, thisArg) {
    if (collection.then) {
      return collection.then(_.partial(wrapCallback, method, callback, thisArg));
    } else {
      return wrapCallback(method, callback, thisArg, collection);
    }
  }

  if (_.each) {
    _.mixin({
      thenEach: _.partial(wrapMethod, _.each)
    });
  } else {
    _.mixin({
      thenForEach: _.partial(wrapMethod, _.forEach)
    });
  }

  var mixin = {
    /**
     * Register a callback if the promise is fulfilled. See {@link https://promisesaplus.com/#point-26}
     *
     * @function then
     * @param {Promise} promise
     * @param then - the callback to be called on fulfillment of the promise
     * @returns {Promise}
     */
    then: _then,

    /**
     * Register a callback if the promise is rejected. See {@link https://promisesaplus.com/#point-27}
     *
     * @function catch
     * @param {Promise} promise
     * @param handleError - the callback to be called on rejection of the promise
     * @returns {Promise}
     */
    catch: _catch,

    /**
     * Register a callback regardless of whether the promise is fulfilled or rejected.
     *
     * @function finally
     * @param {Promise} promise
     * @param handleFinal - the callback to be called on fulfillment or rejection of the promise
     * @returns {Promise}
     */
    finally: _finally,

    /**
     * Create a new promise that is fulfilled if all promises in the array are fulfilled, or rejected if any are rejected.
     * The array may itself be a promise, in which case rejection of that promise will also result in rejection of the all
     * promise.
     *
     * Supports recursive resolution of arrays if the deep argument is set to true.
     *
     * @function thenAll
     * @param {array} arr - the array (or promise of an array). Elements may be mixed with promises and values
     * @param then - optional then callback for the all promise
     * @param {boolean} deep - whether to recursively resolve promises within arrays
     * @returns {Promise}
     */
    thenAll: thenAll,

    /**
     * "Promisified" version of lo-dash's forEach (see {@link https://lodash.com/docs#forEach}.
     *
     * @function thenForEach
     * @param callback
     * @param thisArg
     * @param collection - the collection (or promise of a collection). Elements may be mixed with promises and values
     * @returns {Promise}
     */
    thenForEach: _.partial(wrapMethod, _.forEach),

    /**
     * "Promisified" version of lo-dash's map (see {@link https://lodash.com/docs#map}.
     *
     * @function thenMap
     * @param callback
     * @param thisArg
     * @param collection - the collection (or promise of a collection). Elements may be mixed with promises and values
     * @returns {Promise}
     */
    thenMap: _.partial(wrapMethod, _.map),

    /**
     * "Promisified" version of lo-dash's filter (see {@link https://lodash.com/docs#filter}.
     *
     * @function thenFilter
     * @param callback
     * @param thisArg
     * @param collection - the collection (or promise of a collection). Elements may be mixed with promises and values
     * @returns {Promise}
     */
    thenFilter:  _.partial(wrapMethod, _.filter),

    /**
     * "Promisified" version of lo-dash's zipObject (see {@link https://lodash.com/docs#zipObject}.
     *
     * @function thenZipObject
     * @param props - an array, or promise of an array. Elements may be mixed with promises and values
     * @param vals - an array, or promise of an array. Elements may be mixed with promises and values
     * @returns {Promise}
     */
    thenZipObject: thenZipObject,

    /**
     * "Promisified" version of lo-dash's flatten (see {@link https://lodash.com/docs#flatten}.
     *
     * @function thenFlatten
     * @param array - an array, or promise of an array. Elements may be mixed with promises and values
     * @param {boolean} isShallow
     * @param callback
     * @param thisArg
     * @returns {Promise}
     */
    thenFlatten: thenFlatten
  };

  _.mixin(mixin);

  return _;
};
