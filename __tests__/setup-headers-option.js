/* global expect:false, test:false */
const setupHeadersOption = require("../src/setup-headers-option");

test("it adds Content-Type and Content-Length headers if form data body is exists", () => {
  const headers = setupHeadersOption({
    data: { foo: "bar" },
    headers: {
      baz: 123
    }
  });

  expect(headers).toHaveProperty(
    "Content-Type",
    "application/x-www-form-urlencoded;charset=utf-8"
  );
  expect(headers).toHaveProperty("Content-Length");
  expect(headers).toHaveProperty("baz", 123);
});

test("it adds Content-Type and Content-Length headers if JSON body is exists", () => {
  const headers = setupHeadersOption({
    data: { foo: "bar" },
    json: true,
    headers: {
      baz: 123
    }
  });

  expect(headers).toHaveProperty(
    "Content-Type",
    "application/json;charset=utf-8"
  );
  expect(headers).toHaveProperty("Content-Length");
  expect(headers).toHaveProperty("baz", 123);
});

test("it won't override the existing Content-Type and Content-Length headers", () => {
  const headers = setupHeadersOption({
    data: { foo: "bar" },
    headers: {
      "Content-Type": "text/html",
      "Content-Length": 123
    }
  });

  expect(headers).toHaveProperty("Content-Type", "text/html");
  expect(headers).toHaveProperty("Content-Length", 123);
});

test("it returns null if no data and no headers option", () => {
  expect(setupHeadersOption()).toBeNull();
  expect(setupHeadersOption({})).toBeNull();
  expect(setupHeadersOption({ json: true })).toBeNull();
  expect(setupHeadersOption({ data: {} })).toBeNull();
});
