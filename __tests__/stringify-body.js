/* global expect:false, test:false */
const stringifyBody = require("../src/stringify-body");

test("it can stringify form data body", () => {
  const data = { foo: "bar" };

  expect(stringifyBody(data)).toBe("foo=bar");
  expect(stringifyBody(data, { json: false })).toBe("foo=bar");
});

test("it can stringify JSON body", () => {
  const data = { foo: "bar" };

  expect(stringifyBody(data, { json: true })).toBe('{"foo":"bar"}');
});

test("it returns null if data is empty", () => {
  expect(stringifyBody()).toBeNull();
  expect(stringifyBody({})).toBeNull();
  expect(stringifyBody(null)).toBeNull();
});
