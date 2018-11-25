/**
 * Create response object.
 *
 * @param {ServerResponse} serverResponse
 * @param {Array} options.buffers
 * @param {String} options.encoding
 * @return {Object}
 */
const createResponseObj = (
  serverResponse, { buffers = [], encoding = "utf8" } = {}
) => ({
  statusCode: serverResponse.statusCode,
  statusMessage: serverResponse.statusMessage,
  headers: serverResponse.getHeaders(),
  body: Buffer.concat(buffers).toString(encoding)
});

module.exports = createResponseObj;
