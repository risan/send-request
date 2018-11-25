const qs = require("querystring");
const isNotEmptyObj = require("./is-not-empty-obj");

/**
 * Stringify the request body.
 *
 * @param {Object} data
 * @param {Boolean} options.json
 * @return {String|Null}
 */
const stringifyBody = (data = {}, { json = false } = {}) => {
  if (!isNotEmptyObj(data)) {
    return null;
  }

  if (json) {
    return JSON.stringify(data);
  }

  return qs.stringify(data);
};

module.exports = stringifyBody;
