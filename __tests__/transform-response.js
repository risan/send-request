/* global expect:false, test:false */
const transformResponse = require("../src/transform-response");

const response = {
  statusCode: 200,
  statusMessage: "OK",
  headers: {
    foo: "bar"
  }
};

test("it can transform response object with no body buffers", () => {
  const transformed = transformResponse(response);

  expect(transformed).toEqual({
    statusCode: 200,
    statusMessage: "OK",
    headers: {
      foo: "bar"
    },
    body: ""
  });
});

test("it can convert body buffers to string", () => {
  const transformed = transformResponse(response, {
    buffers: [Buffer.from("hello world")]
  });

  expect(transformed).toEqual({
    statusCode: 200,
    statusMessage: "OK",
    headers: {
      foo: "bar"
    },
    body: "hello world"
  });
});

test("it can automatically convert response with JSON content type to object", () => {
  const data = { message: "hello world" };
  const body = JSON.stringify(data);

  const transformed = transformResponse(
    {
      ...response,
      headers: {
        "content-type": "application/json"
      }
    },
    {
      buffers: [Buffer.from(body)]
    }
  );

  expect(transformed).toEqual({
    statusCode: 200,
    statusMessage: "OK",
    headers: {
      "content-type": "application/json"
    },
    body,
    json: data
  });
});
