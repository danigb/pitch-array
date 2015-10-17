var vows = require('vows')
var assert = require('assert')
var notation = require('../notation')

vows.describe('notation').addBatch({
  'parse string': function () {
    var parser = function (str) { return /^(\d),(\d),(\d)$/.exec(str).slice(1) }
    var pitch = notation(parser, null)
    assert.deepEqual(pitch('1,2,3'), ['1', '2', '3'])
  },
  'build string': function () {
    var builder = function (arr) { return arr.join('-') }
    var pitch = notation(null, builder)
    assert.equal(pitch([1, 2, 3]), '1-2-3')
  },
  'memoize values': function () {
    var pcount = 0
    var bcount = 0
    var parser = function (str) { return [++pcount, ++pcount, ++pcount] }
    var builder = function (arr) { return '' + ++bcount }
    var pitch = notation(parser, builder)

    assert.deepEqual(pitch('A'), [ 1, 2, 3 ])
    assert.deepEqual(pitch('B'), [ 4, 5, 6 ])
    assert.deepEqual(pitch('A'), [ 1, 2, 3 ])
    assert.equal(pitch([0, 0, 0]), 1)
    assert.equal(pitch([1, 0, 0]), 2)
    assert.equal(pitch([1, 1, 0]), 3)
    assert.equal(pitch([1, 1, 1]), 4)
    assert.equal(pitch([0, 0, 0]), 1)
  },
  'asArray': function () {
    var parser = function (val) { return [val, val, val] }
    var pitch = notation(parser, null)
    assert.deepEqual(pitch.asArray([1, 2, 3]), [1, 2, 3])
    assert.deepEqual(pitch.asArray(2), [2, 2, 2])
  },
  'parse and build functions': function () {
    var pitch = notation(function () { return [] }, function () { return '' })
    assert.deepEqual(pitch.parse(), [])
    assert.deepEqual(pitch.build(), '')
    assert.deepEqual(pitch(), [])
    assert.equal(pitch([]), '')
  }
}).export(module)
