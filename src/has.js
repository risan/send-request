const isPlainObj = require("@risan/is-plain-obj");

/**
 * Check if object has the given property name.
 *
 * @param {Mixed} obj
 * @param {String} prop
 * @param {Boolean} options.caseInsensitive
 * @return {Boolean}
 */
const has = (obj, prop, { caseInsensitive = false } = {}) => {
  if (!isPlainObj(obj)) {
    return false;
  }

  let keyName = prop;
  let keys = Object.keys(obj);

  if (caseInsensitive) {
    keyName = prop.toLowerCase();
    keys = keys.map(p => p.toLowerCase());
  }

  return keys.includes(keyName);
};

module.exports = has;
