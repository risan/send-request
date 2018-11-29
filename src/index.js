const http = require("http");
const https = require("https");
const isEmpty = require("@risan/is-empty");

const getRequestOptions = require("./get-request-options");
const parseRequestBody = require("./parse-request-body");
const transformResponse = require("./transform-response");

/**
 * Send HTTP request.
 *
 * @param {String} url
 * @param {Object} options.body
 * @param {Boolean} options.json
 * @param {String|Null} options.encoding
 * @param {Object} options.config
 * @return {Promise}
 */
const sendRequest = async (
  url,
  { body, json = false, encoding, ...config } = {}
) => {
  const { stream, contentType, contentLength } = await parseRequestBody(body, {
    json
  });

  const options = getRequestOptions(url, {
    ...config,
    hasBody: !isEmpty(stream),
    contentType,
    contentLength
  });

  const client = options.protocol === "http:" ? http : https;

  return new Promise(async (resolve, reject) => {
    const request = client.request(options, response => {
      const buffers = [];

      response.on("data", chunk => buffers.push(chunk));

      response.on("end", () => {
        const transformed = transformResponse(response, { buffers, encoding });

        if (response.statusCode >= 400) {
          const error = new Error(transformed.statusMessage);

          error.response = transformed;

          reject(error);
        } else {
          resolve(transformed);
        }
      });
    });

    request.on("error", error => reject(error));

    if (stream) {
      stream.pipe(request);
    } else {
      request.end();
    }
  });
};

module.exports = sendRequest;
