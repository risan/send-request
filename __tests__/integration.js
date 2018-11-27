/* global expect:false, test:false */
const qs = require("querystring");
const FormData = require("form-data");
const nock = require("nock");
const sendRequest = require("../src");

const URL = "http://example.com";

const mockServer = ({
  url = URL,
  path = "/",
  query = {},
  method = "GET",
  requestHeaders = {},
  requestBody,
  status = 200,
  body = "",
  headers = {}
} = {}) =>
  nock(url, {
    reqheaders: requestHeaders
  })
    .intercept(path, method.toUpperCase(), requestBody)
    .query(query)
    .reply(status, body, headers);

test("it can send HTTP GET/POST/PUT/PATCH/DELETE request", async () => {
  let scope;
  let response;

  scope = mockServer({ method: "GET" });
  response = await sendRequest(URL);
  expect(scope.isDone()).toBe(true);
  expect(response).toHaveProperty("statusCode", 200);

  scope = mockServer({ method: "POST" });
  response = await sendRequest(URL, { method: "POST" });
  expect(scope.isDone()).toBe(true);
  expect(response).toHaveProperty("statusCode", 200);

  scope = mockServer({ method: "PUT" });
  response = await sendRequest(URL, { method: "PUT" });
  expect(scope.isDone()).toBe(true);
  expect(response).toHaveProperty("statusCode", 200);

  scope = mockServer({ method: "PATCH" });
  response = await sendRequest(URL, { method: "PATCH" });
  expect(scope.isDone()).toBe(true);
  expect(response).toHaveProperty("statusCode", 200);

  scope = mockServer({ method: "DELETE" });
  response = await sendRequest(URL, { method: "DELETE" });
  expect(scope.isDone()).toBe(true);
  expect(response).toHaveProperty("statusCode", 200);
});

test("it can send HTTPS request", async () => {
  const scope = mockServer({ url: "https://example.com" });

  const response = await sendRequest("https://example.com");

  expect(scope.isDone()).toBe(true);
  expect(response).toHaveProperty("statusCode", 200);
});

test("it can send request to URL with path", async () => {
  const scope = mockServer({ path: "/foo/bar" });

  const response = await sendRequest("http://example.com/foo/bar");

  expect(scope.isDone()).toBe(true);
  expect(response).toHaveProperty("statusCode", 200);
});

test("it can send request to URL with query string", async () => {
  const scope = mockServer({
    query: { foo: "bar" }
  });

  const response = await sendRequest("http://example.com?foo=bar");

  expect(scope.isDone()).toBe(true);
  expect(response).toHaveProperty("statusCode", 200);
});

test("response object must contains statusCode", async () => {
  let scope;
  let response;

  scope = mockServer({ status: 200 });
  response = await sendRequest(URL);
  expect(scope.isDone()).toBe(true);
  expect(response).toHaveProperty("statusCode", 200);

  scope = mockServer({ status: 201 });
  response = await sendRequest(URL);
  expect(scope.isDone()).toBe(true);
  expect(response).toHaveProperty("statusCode", 201);

  scope = mockServer({ status: 202 });
  response = await sendRequest(URL);
  expect(scope.isDone()).toBe(true);
  expect(response).toHaveProperty("statusCode", 202);
});

test("it throws error when status code >= 400", async () => {
  let scope;

  try {
    scope = mockServer({ status: 400 });
    await sendRequest(URL);
  } catch (error) {
    expect(scope.isDone()).toBe(true);
    expect(error.response).toHaveProperty("statusCode", 400);
  }

  try {
    scope = mockServer({ status: 404 });
    await sendRequest(URL);
  } catch (error) {
    expect(scope.isDone()).toBe(true);
    expect(error.response).toHaveProperty("statusCode", 404);
  }

  try {
    scope = mockServer({ status: 500 });
    await sendRequest(URL);
  } catch (error) {
    expect(scope.isDone()).toBe(true);
    expect(error.response).toHaveProperty("statusCode", 500);
  }
});

test("response object must contains body", async () => {
  const scope = mockServer({ body: "foo" });

  const response = await sendRequest(URL);

  expect(scope.isDone()).toBe(true);
  expect(response).toHaveProperty("body", "foo");
});

test("it can automatically parse JSON response", async () => {
  const body = { name: "john", age: 20 };

  const scope = mockServer({ body });

  const response = await sendRequest(URL);

  expect(scope.isDone()).toBe(true);
  expect(response).toHaveProperty("json", body);
});

test("response object must contains headers", async () => {
  const headers = { foo: "bar" };

  const scope = mockServer({ headers });

  const response = await sendRequest(URL);

  expect(scope.isDone()).toBe(true);
  expect(response).toHaveProperty("headers", headers);
});

test("it can send form-urlencoded body", async () => {
  const body = { foo: "bar" };

  const scope = mockServer({
    method: "POST",
    requestHeaders: {
      "content-type": "application/x-www-form-urlencoded",
      "content-length": value => parseInt(value, 10) > 0
    },
    requestBody: qs.stringify(body)
  });

  const response = await sendRequest(URL, {
    body,
    method: "POST"
  });

  expect(scope.isDone()).toBe(true);
  expect(response).toHaveProperty("statusCode", 200);
});

test("it can send JSON body", async () => {
  const body = { foo: "bar" };

  const scope = mockServer({
    method: "POST",
    requestHeaders: {
      "content-type": "application/json",
      "content-length": value => parseInt(value, 10) > 0
    },
    requestBody: JSON.stringify(body)
  });

  const response = await sendRequest(URL, {
    body,
    json: true,
    method: "POST"
  });

  expect(scope.isDone()).toBe(true);
  expect(response).toHaveProperty("statusCode", 200);
});

test("it can send form-data body", async () => {
  const form = new FormData();
  form.append("foo", "bar");

  const scope = mockServer({
    method: "POST",
    requestHeaders: {
      "content-type": value => /^multipart\/form-data; boundary=/i.test(value),
      "content-length": value => parseInt(value, 10) > 0
    },
    requestBody: body => /foo/gim.test(body)
  });

  const response = await sendRequest(URL, {
    body: form,
    method: "POST"
  });

  expect(scope.isDone()).toBe(true);
  expect(response).toHaveProperty("statusCode", 200);
});
