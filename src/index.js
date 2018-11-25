const http = require("http");
const https = require("https");

const createResponseObj = require("./create-response-obj");
const getRequestOptions = require("./get-request-options");
const stringifyBody = require("./stringify-body");

const request = (url, { encoding, ...requestOptions }) => {
  const options = getRequestOptions({ url, ...requestOptions });

  const client = options.protocol === "http:" ? http : https;

  return new Promise((resolve, reject) => {
    const request = client.request(options, response => {
      const buffers = [];

      response.on("data", chunk => buffers.push(chunk));

      response.on("end", () => {
        const responseObj = getRequestOptions(response, { buffers, encoding });

        if (response.statusCode >= 400) {
          const error = new Error(responseObj.statusMessage);
          error.response = responseObj;

          return reject(error);
        }

        resolve(responseObj);
      });
    });

    request.on("error", error => reject(error));

    const body = stringifyBody(options);

    if (body !== null) {
      request.write(body);
    }

    request.end();
  });
};

module.exports = request;
