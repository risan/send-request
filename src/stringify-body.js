const qs = require("querystring");
const isNotEmptyObj = require("./is-not-empty-obj");

/**
 * Stringify the request body.
 *
 * @param {Object} body
 * @param {Boolean} options.json
 * @return {String|Null}
 */
const stringifyBody = (body = {}, { json = false } = {}) => {
  if (!isNotEmptyObj(body)) {
    return null;
  }

  if (json) {
    return JSON.stringify(body);
  }

  return qs.stringify(body);
};

module.exports = stringifyBody;
