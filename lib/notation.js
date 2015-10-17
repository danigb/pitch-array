
/**
 * Create an a-pitch notation function
 *
 * Given a parser (a function that converts from string to a-pitch) and a builder
 * (a function that convertos from a-pitch to string) create a function that
 * perform boths conversions (depending on the arguments) and memoize the values
 *
 * A notation function has the following characteristics:
 * - convert from string to array and the opposite
 * - caches the values
 * - have parse and build function to bypass the cache
 * - have asArray utility function
 *
 * @param {Function} parser - the parser function (from string to a-pitch)
 * @param {Function} builder - the builder function (from a-pitch to string)
 * @return {Function} the standard parser
 *
 * @example
 * var notation = require('a-pitch/notation')
 * var pitch = notation(parsePitch, buildPitch)
 * pitch('C#2') // => [0, 1, 2]
 * pitch([0, 1, 2]) // => 'C#2'
 */
function notation (parse, build) {
  var cache = {}
  function notation (value) {
    if (Array.isArray(value)) {
      var str = '|' + value[0] + '|' + value[1] + '|' + value[2]
      return cache[str] ? cache[str] : cache[str] = build(value)
    } else {
      return value in cache ? cache[value] : cache[value] = parse(value)
    }
  }
  notation.parse = parse
  notation.build = build
  notation.asArray = function (value) {
    return Array.isArray(value) ? value : notation(value)
  }
  return notation
}

module.exports = notation
