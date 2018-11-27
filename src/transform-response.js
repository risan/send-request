const has = require("./has");

/**
 * Check if the content-type is JSON.
 *
 * @param {Object} headers
 * @return {Boolean}
 */
const isJsonContentType = headers => {
  if (!has(headers, "content-type")) {
    return false;
  }

  return /application\/json/i.test(headers["content-type"]);
};

/**
 * Transform response object.
 *
 * @param {ServerResponse} response
 * @param {Array} options.buffers
 * @param {String} options.encoding
 * @return {Object}
 */
const transformResponse = (
  response,
  { buffers = [], encoding = "utf8" } = {}
) => {
  const { statusCode, statusMessage, headers } = response;

  const transformed = {
    statusCode,
    statusMessage,
    headers,
    body: Buffer.concat(buffers).toString(encoding)
  };

  if (isJsonContentType(headers)) {
    transformed.json = JSON.parse(transformed.body);
  }

  return transformed;
};

module.exports = transformResponse;
