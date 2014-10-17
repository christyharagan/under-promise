'use strict';

var Promise = require('bluebird');
var _ = require('../lib/index');

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;

describe('lodash promise enabled functions', function () {

  /*
   * Most methods have the same function signature and use the same wrapper code. Thus, only one implementation
   * needs to be tested to ensure correct functionality.
   */
  describe('thenMap', function () {
    it('should map the resolved array', function(){
      var test = Promise.resolve([1, Promise.resolve(2)]);

      return _.thenMap(test, function(n){return n + 1;}).then(function(value){
        expect(value).to.have.length(2);
        expect(value[0]).to.equal(2);
        return expect(value[1]).to.eventually.equal(3);
      });
    });
  });

  describe('thenFlatten', function () {
    it('should flatten the array', function () {
      var testArr = [
        1,
        Promise.resolve([
            Promise.resolve(2),
            3,
            Promise.resolve([
                4,
                5,
                Promise.resolve(6)
              ])
          ]),
        7,
        [
          8,
          Promise.resolve([
            Promise.resolve(9)
          ])
        ],
        [[[10]]],
        [[[[Promise.resolve(11)]]]]
      ];

      return expect(_.thenFlatten(testArr)).to.eventually.deep.equal([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
    });
  });
  describe('thenZipObject', function () {
    it('should work with an array of arrays', function(){
      var test = Promise.resolve([['key1', 1], Promise.resolve([Promise.resolve('key2'), Promise.resolve(2)])]);

      return expect(_.thenZipObject(test)).to.eventually.deep.equal({
        key1: 1,
        key2: 2
      });
    });
    it('should work with an array of props and an array of vals', function(){
      var props = ['key1', Promise.resolve('key2')];
      var vals = Promise.resolve([Promise.resolve(1), 2]);

      return expect(_.thenZipObject(props, vals)).to.eventually.deep.equal({
        key1: 1,
        key2: 2
      });

    });
  });
});
