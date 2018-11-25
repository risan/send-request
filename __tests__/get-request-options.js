/* global expect:false, test:false */
const getRequestOptions = require("../src/get-request-options");

test("it can get request options from just a url", () => {
  const options = getRequestOptions("https://example.com");

  expect(options).toEqual({
    protocol: "https:",
    hostname: "example.com",
    path: "/",
    method: "GET",
    headers: {}
  });
});

test("it will use http if protocol is not set in the url", () => {
  const options = getRequestOptions("example.com");

  expect(options).toHaveProperty("protocol", "http:")
});

test("it can override the http method", () => {
  const options = getRequestOptions("https://example.com", {
    method: "post"
  });

  expect(options).toHaveProperty("method", "POST")
});

test("it can receive headers option", () => {
  const options = getRequestOptions("https://example.com", {
    headers: {
      baz: 123
    }
  });

  expect(options).toHaveProperty("headers", { baz: 123 });
});

test("it can extract the port option from url", () => {
  const options = getRequestOptions("https://@example.com:1234");

  expect(options).toHaveProperty("port", 1234);
});

test("it can extract the auth option from url", () => {
  const options = getRequestOptions("https://john:secret@example.com");

  expect(options).toHaveProperty("auth", "john:secret");
});
