/**
 * Check if the given value is a function.
 *
 * @param {Mixed} value
 * @return {Boolean}
 */
const isFunction = value => typeof value === "function";

/**
 * Check if the given value is a FormData instance.
 *
 * @param {Mixed} value
 * @return {Boolean}
 */
const isFormData = value =>
  typeof value === "object" &&
  isFunction(value.pipe) &&
  isFunction(value.append) &&
  isFunction(value.getBoundary) &&
  isFunction(value.getLength);

module.exports = isFormData;
