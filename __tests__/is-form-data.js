/* global expect:false, test:false */
const FormData = require("form-data");
const isFormData = require("../src/is-form-data");

test("it returns true if value is a form data", () => {
  const form = new FormData();

  expect(isFormData(form)).toBe(true);

  form.append("foo", "bar");
  expect(isFormData(form)).toBe(true);
});

test("it returns false if value is not a form data", () => {
  expect(isFormData({})).toBe(false);
  expect(isFormData({ foo: "bar" })).toBe(false);
});
