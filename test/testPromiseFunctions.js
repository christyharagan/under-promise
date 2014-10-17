'use strict';

var Promise = require('bluebird');
var _ = require('../lib/index');

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var expect = chai.expect;

chai.use(chaiAsPromised);

describe('promise functions on lo-dash', function () {
  describe('then', function () {
    it('should be called on resolution', function () {
      var test = _.then(Promise.resolve(), function () {
        return 'resolved';
      });

      return expect(test).to.eventually.equal('resolved');
    });
    it('should be not called on failure', function () {
      var test = _.then(Promise.reject(new Error()), function () {
        return 'resolved';
      }).catch(function () {
        // Prevent mocha from thinking there's an error
      });

      return expect(test).to.not.eventually.equal('resolved');
    });
  });
  describe('thenAll', function () {
    it('should return the resolved array on full resolution', function(){
      var test = _.thenAll(Promise.resolve([Promise.resolve(1), 2, Promise.resolve(3)]));

      return expect(test).to.eventually.deep.equal([1, 2, 3]);
    });

    it('should be called on full resolution', function(){
      var test = _.thenAll([Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)], function(arr){
        expect(arr).to.deep.equal([1, 2, 3]);

        return 'resolved';
      });

      return expect(test).to.eventually.deep.equal('resolved');
    });

    it('should not be called on any failure', function(){
      var test = _.thenAll([Promise.resolve(1), Promise.reject(new Error()), Promise.resolve(3)], function(){
        return 'resolved';
      }).catch(function () {
        // Prevent mocha from thinking there's an error
      });

      return expect(test).to.eventually.not.equal('resolved');
    });
  });
  describe('catch', function () {
    it('should not be called on resolution', function () {
      var test = _.catch(Promise.resolve(), function () {
        return 'rejected';
      });

      return expect(test).to.not.eventually.equal('rejected');
    });
    it('should be called on failure', function () {
      var test = _.catch(Promise.reject(new Error()), function () {
        return 'rejected';
      });

      return expect(test).to.eventually.equal('rejected');
    });
  });
  describe('finally', function () {
    it('should be called on resolution', function (done) {
      return _.finally(Promise.resolve(), function(){
        done();
      });
    });
    it('should be called on failure', function (done) {
      return _.finally(Promise.reject(new Error()), function () {
        done();
      }).catch(function () {
        // Prevent mocha from thinking there's an error
      });
    });
  });
});
