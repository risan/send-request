const qs = require("querystring");
const strToStream = require("str-to-stream");

const isFormData = require("./is-form-data");
const isNotEmptyObj = require("./is-not-empty-obj");
const parseFormData = require("./parse-form-data");

/**
 * Parse request body.
 *
 * @param {Object} body
 * @param {Boolean} options.json
 * @return {Object}
 */
const parseRequestBody = async (body = {}, { json = false } = {}) => {
  if (isFormData(body)) {
    return parseFormData(body);
  }

  if (!isNotEmptyObj(body)) {
    return {};
  }

  const str = json ? JSON.stringify(body) : qs.stringify(body);

  return {
    stream: strToStream(str),
    contentLength: Buffer.byteLength(str),
    contentType: json ? "application/json" : "application/x-www-form-urlencoded"
  };
};

module.exports = parseRequestBody;
