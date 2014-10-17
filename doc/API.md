#Index

**Functions**

* [then(promise, then)](#then)
* [catch(promise, handleError)](#catch)
* [finally(promise, handleFinal)](#finally)
* [thenAll(arr, then, deep)](#thenAll)
* [thenForEach(callback, thisArg, collection)](#thenForEach)
* [thenMap(callback, thisArg, collection)](#thenMap)
* [thenFilter(callback, thisArg, collection)](#thenFilter)
* [thenZipObject(props, vals)](#thenZipObject)
* [thenFlatten(array, isShallow, callback, thisArg)](#thenFlatten)
 
<a name="then"></a>
#then(promise, then)
Register a callback if the promise is fulfilled. See [https://promisesaplus.com/#point-26](https://promisesaplus.com/#point-26)

**Params**

- promise `Promise`  
- then  - the callback to be called on fulfillment of the promise  

**Returns**: `Promise`  
<a name="catch"></a>
#catch(promise, handleError)
Register a callback if the promise is rejected. See [https://promisesaplus.com/#point-27](https://promisesaplus.com/#point-27)

**Params**

- promise `Promise`  
- handleError  - the callback to be called on rejection of the promise  

**Returns**: `Promise`  
<a name="finally"></a>
#finally(promise, handleFinal)
Register a callback regardless of whether the promise is fulfilled or rejected.

**Params**

- promise `Promise`  
- handleFinal  - the callback to be called on fulfillment or rejection of the promise  

**Returns**: `Promise`  
<a name="thenAll"></a>
#thenAll(arr, then, deep)
Create a new promise that is fulfilled if all promises in the array are fulfilled, or rejected if any are rejected.The array may itself be a promise, in which case rejection of that promise will also result in rejection of the allpromise.Supports recursive resolution of arrays if the deep argument is set to true.

**Params**

- arr `array` - the array (or promise of an array). Elements may be mixed with promises and values  
- then  - optional then callback for the all promise  
- deep `boolean` - whether to recursively resolve promises within arrays  

**Returns**: `Promise`  
<a name="thenForEach"></a>
#thenForEach(callback, thisArg, collection)
"Promisified" version of lo-dash's forEach (see [https://lodash.com/docs#forEach](https://lodash.com/docs#forEach).

**Params**

- callback   
- thisArg   
- collection  - the collection (or promise of a collection). Elements may be mixed with promises and values  

**Returns**: `Promise`  
<a name="thenMap"></a>
#thenMap(callback, thisArg, collection)
"Promisified" version of lo-dash's map (see [https://lodash.com/docs#map](https://lodash.com/docs#map).

**Params**

- callback   
- thisArg   
- collection  - the collection (or promise of a collection). Elements may be mixed with promises and values  

**Returns**: `Promise`  
<a name="thenFilter"></a>
#thenFilter(callback, thisArg, collection)
"Promisified" version of lo-dash's filter (see [https://lodash.com/docs#filter](https://lodash.com/docs#filter).

**Params**

- callback   
- thisArg   
- collection  - the collection (or promise of a collection). Elements may be mixed with promises and values  

**Returns**: `Promise`  
<a name="thenZipObject"></a>
#thenZipObject(props, vals)
"Promisified" version of lo-dash's zipObject (see [https://lodash.com/docs#zipObject](https://lodash.com/docs#zipObject).

**Params**

- props  - an array, or promise of an array. Elements may be mixed with promises and values  
- vals  - an array, or promise of an array. Elements may be mixed with promises and values  

**Returns**: `Promise`  
<a name="thenFlatten"></a>
#thenFlatten(array, isShallow, callback, thisArg)
"Promisified" version of lo-dash's flatten (see [https://lodash.com/docs#flatten](https://lodash.com/docs#flatten).

**Params**

- array  - an array, or promise of an array. Elements may be mixed with promises and values  
- isShallow `boolean`  
- callback   
- thisArg   

**Returns**: `Promise`  
