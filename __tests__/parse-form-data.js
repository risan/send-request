/* global expect:false, test:false */
const FormData = require("form-data");
const parseFormData = require("../src/parse-form-data");

test("it can parse form data instance", async () => {
  const form = new FormData();
  form.append("foo", "bar");

  const body = await parseFormData(form);

  expect(body).toHaveProperty("stream", form);
  expect(typeof body.contentLength).toBe("number");
  expect(body.contentType).toMatch(/^multipart\/form-data; boundary=/i);
});
