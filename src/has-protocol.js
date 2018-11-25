/**
 * Check if url has protocol part.
 *
 * @param {String} url
 * @return {Boolean}
 */
const hasProtocol = url => /^http[s]?:\/\//i.test(url);

module.exports = hasProtocol;
