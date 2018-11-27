const util = require("util");

/**
 * Parse form data.
 *
 * @param {FormData} form
 * @return {Object}
 */
const parseFormData = async form => {
  const contentLength = await util.promisify(form.getLength.bind(form))();

  return {
    stream: form,
    contentLength,
    contentType: `multipart/form-data; boundary=${form.getBoundary()}`
  };
};

module.exports = parseFormData;
