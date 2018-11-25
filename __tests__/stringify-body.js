/* global expect:false, test:false */
const stringifyBody = require("../src/stringify-body");

test("it can stringify body as a form data", () => {
  const body = { foo: "bar" };

  expect(stringifyBody(body)).toBe("foo=bar");
  expect(stringifyBody(body, { json: false })).toBe("foo=bar");
});

test("it can stringify body as a JSON", () => {
  const body = { foo: "bar" };

  expect(stringifyBody(body, { json: true })).toBe('{"foo":"bar"}');
});

test("it returns null if body is empty", () => {
  expect(stringifyBody()).toBeNull();
  expect(stringifyBody({})).toBeNull();
  expect(stringifyBody(null)).toBeNull();
});
