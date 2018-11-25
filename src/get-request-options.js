const isEmpty = require("@risan/is-empty");

const hasProtocol = require("./has-protocol");
const isNotEmptyObj = require("./is-not-empty-obj");
const mergeAuthOption = require("./merge-auth-option");

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
 * @return {Object}
 */
const getRequestOptions = (url, {
  method = "GET",
  headers,
  auth
} = {}) => {
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

  return config;
};

module.exports = getRequestOptions;
