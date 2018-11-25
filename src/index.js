const http = require("http");
const https = require("https");

const getRequestOptions = require("./get-request-options");
const stringifyBody = require("./stringify-body");
const transformResponse = require("./transform-response");

/**
 * Send HTTP request.
 *
 * @param {String} url
 * @param {Object} options.body
 * @param {Boolean} options.json
 * @param {String} options.encoding
 * @param {Object} options.config
 * @return {Promise}
 */
const sendRequest = (url, { body, json = false, encoding, ...config }) => {
  const options = getRequestOptions(url, { ...config });

  const client = options.protocol === "http:" ? http : https;

  return new Promise((resolve, reject) => {
    const request = client.request(options, response => {
      const buffers = [];

      response.on("data", chunk => buffers.push(chunk));

      response.on("end", () => {
        const resObj = transformResponse(response, { buffers, encoding });

        if (response.statusCode >= 400) {
          const error = new Error(resObj.statusMessage);

          error.response = resObj;

          return reject(error);
        }

        resolve(resObj);
      });
    });

    request.on("error", error => reject(error));

    const data = stringifyBody(body, { json });

    if (data !== null) {
      request.write(data);
    }

    request.end();
  });
};

module.exports = sendRequest;
