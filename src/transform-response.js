/**
 * Transform response object.
 *
 * @param {ServerResponse} response
 * @param {Array} options.buffers
 * @param {String} options.encoding
 * @return {Object}
 */
const transformResponse = (
  response, { buffers = [], encoding = "utf8" } = {}
) => {
  const { statusCode, statusMessage, getHeader, hasHeader } = response;

  return {
    statusCode,
    statusMessage,
    getHeader,
    hasHeader,
    headers: response.getHeaders(),
    body: Buffer.concat(buffers).toString(encoding)
  };
};

module.exports = transformResponse;
