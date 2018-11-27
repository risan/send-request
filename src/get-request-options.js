const { URL } = require("url");
const isEmpty = require("@risan/is-empty");

const has = require("./has");
const hasProtocol = require("./has-protocol");
const isNotEmptyObj = require("./is-not-empty-obj");
const mergeAuthOption = require("./merge-auth-option");

/**
 * Check if the given key is exists in the headers.
 *
 * @param {Object} headers
 * @param {String} key
 * @return {Boolean}
 */
const headersHas = (headers, key) =>
  has(headers, key, { caseInsensitive: true });

/**
 * Parse the given URL string.
 *
 * @param {String} url
 * @return {URL}
 */
const parseUrl = url => {
  if (hasProtocol(url)) {
    return new URL(url);
  }

  return new URL(`http://${url}`);
};

/**
 * Get request options.
 *
 * @param {String} url
 * @param {String} options.method
 * @param {Object} options.headers
 * @param {Object} auth
 * @param {Boolean} hasBody
 * @param {String} contentType
 * @param {Number} contentLength
 * @return {Object}
 */
const getRequestOptions = (
  url,
  {
    method = "GET",
    headers,
    auth,
    hasBody = false,
    contentType,
    contentLength
  } = {}
) => {
  const {
    protocol,
    username,
    password,
    hostname,
    port,
    pathname,
    search
  } = parseUrl(url);

  const path = `${pathname}${search}`;
  const portNumber = parseInt(port, 10);
  const authOption = mergeAuthOption({ username, password, auth });

  const config = {
    protocol,
    hostname,
    path,
    method: method.toUpperCase(),
    headers: isNotEmptyObj(headers) ? headers : {}
  };

  if (!isEmpty(portNumber)) {
    config.port = portNumber;
  }

  if (authOption !== null) {
    config.auth = authOption;
  }

  if (hasBody) {
    if (!headersHas(config.headers, "content-type")) {
      config.headers["content-type"] = contentType;
    }

    if (!headersHas(config.headers, "content-length")) {
      config.headers["content-length"] = contentLength;
    }
  }

  return config;
};

module.exports = getRequestOptions;
