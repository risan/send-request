const isEmpty = require("@risan/is-empty");
const has = require("./has");

/**
 * Merge the auth option.
 *
 * @param {String} options.username
 * @param {String} options.password
 * @param {Object} options.auth
 * @return {String|Null}
 */
const mergeAuthOption = ({ username, password, auth } = {}) => {
  let user = username;
  let pass = password;

  if (has(auth, "username")) {
    user = auth.username;
  }

  if (has(auth, "password")) {
    pass = auth.password;
  }

  if (isEmpty(user)) {
    return null;
  }

  if (isEmpty(pass)) {
    return user;
  }

  return `${user}:${pass}`;
};

module.exports = mergeAuthOption;
