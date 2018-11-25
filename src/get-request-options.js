const isEmpty = require("@risan/is-empty");

const hasProtocol = require("./has-protocol");
const mergeAuthOption = require("./merge-auth-option");
const setupHeadersOption = require("./setup-headers-option");

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
 * @param {String} options.url
 * @param {String} options.method
 * @param {Object} options.data
 * @param {Boolean} options.json
 * @param {Object} options.headers
 * @param {Object} auth}
 * @return {Object}
 */
const getRequestOptions = ({
  url,
  method = "GET",
  data,
  json = false,
  headers = {},
  auth
}) => {
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
  const headerOptions = setupHeadersOption({ data, json, headers });

  const config = {
    protocol,
    hostname,
    path,
    method: method.toUpperCase()
  };

  if (!isEmpty(portNumber)) {
    config.port = portNumber;
  }

  if (authOption !== null) {
    config.auth = authOption;
  }

  if (!isEmpty(headerOptions)) {
    config.headers = headerOptions;
  }

  return config;
};

module.exports = getRequestOptions;
