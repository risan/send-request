/* global expect:false, test:false */
const getRequestOptions = require("../src/get-request-options");
const setupHeadersOption = require("../src/setup-headers-option");

jest.mock("../src/setup-headers-option");

test("it can get request options from just a url", () => {
  const options = getRequestOptions({
    url: "https://example.com"
  });

  expect(options).toEqual({
    protocol: "https:",
    hostname: "example.com",
    path: "/",
    method: "GET"
  });
});

test("it will use http protocol if it's not set in the url", () => {
  const options = getRequestOptions({
    url: "example.com"
  });

  expect(options).toHaveProperty("protocol", "http:")
});

test("it can override the http method", () => {
  const options = getRequestOptions({
    url: "https://example.com",
    method: "post"
  });

  expect(options).toHaveProperty("method", "POST")
});

test("it can extract the port option from url", () => {
  const options = getRequestOptions({
    url: "https://@example.com:1234"
  });

  expect(options).toHaveProperty("port", 1234);
});

test("it can extract the auth option from url", () => {
  const options = getRequestOptions({
    url: "https://john:secret@example.com"
  });

  expect(options).toHaveProperty("auth", "john:secret");
});

test("request options has headers property if setupHeadersOption returns object", () => {
  const headers = {
    "Content-Type": "text/html"
  };

  setupHeadersOption.mockReturnValue(headers);

  const options = getRequestOptions({
    url: "https://example.com",
    data: { foo: "bar" },
    json: true,
    headers: {
      baz: 123
    }
  });

  expect(setupHeadersOption).toHaveBeenCalledTimes(1);
  expect(setupHeadersOption).toHaveBeenCalledWith({
    data: { foo: "bar" },
    json: true,
    headers: {
      baz: 123
    }
  });
  expect(options.headers).toEqual(headers);
});

test("request options has no headers property if setupHeadersOption returns null", () => {
  setupHeadersOption.mockReturnValue(null);

  const options = getRequestOptions({
    url: "https://example.com",
    data: {},
    json: true,
    headers: {}
  });

  expect(setupHeadersOption).toHaveBeenCalledTimes(1);
  expect(setupHeadersOption).toHaveBeenCalledWith({
    data: {},
    json: true,
    headers: {}
  });
  expect(options.headers).toBeUndefined();
});
