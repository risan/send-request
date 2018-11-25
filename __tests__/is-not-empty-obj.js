/* global expect:false, test:false */
const isNotEmptyObj = require("../src/is-not-empty-obj");

test("it can check if object is not empty or not", () => {
  expect(isNotEmptyObj({})).toBe(false);
  expect(isNotEmptyObj({ foo: "bar" })).toBe(true);
});

test("it returns false if it's not a plain object", () => {
  expect(isNotEmptyObj(null)).toBe(false);
  expect(isNotEmptyObj(undefined)).toBe(false);
  expect(isNotEmptyObj(true)).toBe(false);
  expect(isNotEmptyObj(false)).toBe(false);
  expect(isNotEmptyObj(new Date())).toBe(false);
  expect(isNotEmptyObj(123)).toBe(false);
  expect(isNotEmptyObj("foo")).toBe(false);
});
