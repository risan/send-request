/* global expect:false, test:false */
const has = require("../src/has");

test("it can check if property is exists on the object", () => {
  expect(has({ foo: "bar" }, "foo")).toBe(true);
  expect(has({ foo: null }, "foo")).toBe(true);
  expect(has({ foo: undefined }, "foo")).toBe(true);

  expect(has({}, "foo")).toBe(false);
  expect(has({ foo: "bar" }, "FOO")).toBe(false);
  expect(has({ foo: "bar" }, "bar")).toBe(false);
});

test("it can check the object's property with case insensitivity option", () => {
  const caseInsensitiveOption = { caseInsensitive: true };

  expect(has({ foo: "bar" }, "FOO")).toBe(false);
  expect(has({ foo: "bar" }, "FOO", caseInsensitiveOption)).toBe(true);
  expect(has({ foo: "bar" }, "Foo", caseInsensitiveOption)).toBe(true);
  expect(has({ foo: "bar" }, "foo", caseInsensitiveOption)).toBe(true);

  expect(has({ foo: "bar" }, "bar", caseInsensitiveOption)).toBe(false);
});

test("it returns false if it's not a plain object", () => {
  expect(has(null, "foo")).toBe(false);
  expect(has(undefined, "foo")).toBe(false);
  expect(has(true, "foo")).toBe(false);
  expect(has(false, "foo")).toBe(false);
  expect(has("foo", "foo")).toBe(false);
  expect(has(123, "foo")).toBe(false);
  expect(has(["foo"], "foo")).toBe(false);
});
