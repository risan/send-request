const isPlainObj = require("@risan/is-plain-obj");

const has = require("./has");
const isNotEmptyObj = require("./is-not-empty-obj");
const stringifyBody = require("./stringify-body");

/**
 * Check if the given header key is exists.
 *
 * @param {Object} headers
 * @param {String} key
 * @return {Boolean}
 */
const headerHas = (headers, key) =>
  has(headers, key, { caseInsensitive: true });

/**
 * Setup headers option.
 *
 * @param {Object} options.data
 * @param {Boolean} options.json
 * @param {Object} options.headers
 * @return {Object|Null}
 */
const setupHeadersOption = ({ data, json = false, headers } = {}) => {
  const headersOption = isPlainObj(headers) ? { ...headers } : {};

  if (isNotEmptyObj(data)) {
    if (!headerHas(headersOption, "Content-Type")) {
      headersOption["Content-Type"] = json
        ? "application/json;charset=utf-8"
        : "application/x-www-form-urlencoded;charset=utf-8";
    }

    if (!headerHas(headersOption, "Content-Length")) {
      headersOption["Content-Length"] = Buffer.byteLength(
        stringifyBody(data, { json })
      );
    }
  }

  if (isNotEmptyObj(headersOption)) {
    return headersOption;
  }

  return null;
};

module.exports = setupHeadersOption;
