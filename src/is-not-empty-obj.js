const isEmpty = require("@risan/is-empty");
const isPlainObj = require("@risan/is-plain-obj");

/**
 * Check if value is not an empty plain object.
 *
 * @param {Mixed} value
 * @return {Boolean}
 */
const isNotEmptyObj = value => isPlainObj(value) && !isEmpty(value);

module.exports = isNotEmptyObj;
