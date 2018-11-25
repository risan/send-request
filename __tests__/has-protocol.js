/* global expect:false, test:false */
const hasProtocol = require("../src/has-protocol");

test("it returns true if url has http protocol", () => {
  expect(hasProtocol("http://example.com")).toBe(true);
  expect(hasProtocol("HTTP://EXAMPLE.COM")).toBe(true);
});

test("it returns true if url has https protocol", () => {
  expect(hasProtocol("https://example.com")).toBe(true);
  expect(hasProtocol("HTTPS://EXAMPLE.COM")).toBe(true);
});

test("it returns false if url has no http or https protocol", () => {
  expect(hasProtocol("example.com")).toBe(false);
  expect(hasProtocol("httpexample.com")).toBe(false);
  expect(hasProtocol("httpsexample.com")).toBe(false);
});
