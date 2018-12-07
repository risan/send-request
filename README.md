# Send Request

[![Build Status](https://badgen.net/travis/risan/send-request)](https://travis-ci.org/risan/send-request)
[![Test Covarage](https://badgen.net/codecov/c/github/risan/send-request)](https://codecov.io/gh/risan/send-request)
[![Greenkeeper](https://badges.greenkeeper.io/risan/send-request.svg)](https://greenkeeper.io)
[![Latest Version](https://badgen.net/npm/v/send-request)](https://www.npmjs.com/package/send-request)

Lightweight HTTP client for Node.

## Installation

```bash
$ npm install send-request
```

## Usage

Send HTTP GET request:

```js
const sendRequest = require("send-request");

(async () => {
  const response = await sendRequest("https://httpbin.org/json");

  console.log(`Status Code: ${response.statusCode}`);
  console.log({ headers: response.headers });
  console.log(response.body); // Response as a string

  // If response's content type is a JSON, you get the parsed object.
  console.log(response.json);
})();
```

## Recipes

### Handling Error

```js
const sendRequest = require("send-request");

(async () => {
  try {
    const response = await sendRequest("https://httpbin.org/status/400");
  } catch(error) {
    console.log(error.message);

    // If it's an HTTP error, it will have response property.
    if (error.response) {
      console.log(error.response.statusCode); // 400
      console.log(error.response.statusMessage);
      console.log(error.response.headers);
      console.log(error.response.body);
    }
  }
})();
```

### Send HTTP POST Request with Body

If you don't set the `content-type` and `content-length` headers, it will be automatically added. The `content-type` will be set to `application/x-www-form-urlencoded`.

```js
const sendRequest = require("send-request");

(async () => {
  const response = await sendRequest("https://httpbin.org/anything", {
    method: "POST",
    body: {
      foo: "bar"
    }
  });

  console.log(response.body);
})();
```

### Send HTTP Request with JSON Body

If you don't set the `content-type` and `content-length` headers, it will be automatically added. The `content-type` will be set to `application/json`.

```js
const sendRequest = require("send-request");

(async () => {
  const response = await sendRequest("https://httpbin.org/anything", {
    method: "POST",
    body: {
      foo: "bar"
    },
    json: true // Must be set to true
  });

  console.log(response.json);
})();
```

### Sending File with FormData

You pass the [`FormData`](https://github.com/form-data/form-data) instance as a `body`. If you don't set the `content-type` and `content-length` headers, it will be automatically added. The `content-type` will be set to `multipart/form-data`. The `json` option won't have any effect.

```js
const fs = require("fs");
const sendRequest = require("send-request");
const FormData = require("form-data");

(async () => {
  const file = fs.createReadStream("./test.txt");

  const form = new FormData();
  form.append("foo", "bar");
  form.append("my_file", file);

  const response = await sendRequest("https://httpbin.org/anything", {
    method: "POST",
    body: form
  });

  console.log(response);
})();
```

## API

```js
sendRequest(url, [{
  method,
  headers,
  auth: {
    username,
    password
  },
  body,
  json,
  encoding
}])
```

### Parameters

* **`url`** (*`String`*): The URL to send the HTTP request to.
* **`method`** (optional *`String`*): The HTTP method to use, default to `GET`.
* **`headers`** (optional *`Object`*): The request headers to send.
* **`auth.username`** (optional *`String`*): The username for HTTP basic auth.
* **`auth.password`** (optional *`String`*): The password for HTTP basic auth.
* **`body`** (optional *`Object|FormData`*): The request body to send. It can be a plain JavaScript object or an instance of [`FormData`](https://github.com/form-data/form-data).
* **`json`** (optional *Boolean*): Set to `true` if you want to send the request body with `application/json` content type. Default to `false`, which means that the request body will be sent as `application/x-www-form-urlencoded`. Note that you can still override the content type using the `headers` option.
* **`encoding`** (optional *`String`*|*`Null`*): The encoding to decode the incoming response. If set to `null`, the response's body will be a `Buffer` instance.

### Returns

It returns a `Promise` which when resolved contains a response object. Here's an example of a reponse object:

```js
{
  statusCode: 200,
  statusMessage: "OK",
  headers: {
    "content-type": "application/json"
  },
  body: '{"foo": "bar"}',
  json: {
    foo: "bar"
  }
}
```

* **`statusCode`** (*Number*): The HTTP status code.
* **`statusMessage`** (*Number*): The HTTP status message (reason phrase).
* **`headers`** (*Object*): The response's headers.
* **`body`** (*String*): The response's body.
* **`json`** (*Object*): The parsed JSON body. It only exist if the response's content type is `application/json`.

## License

[MIT](https://github.com/risan/send-request/blob/master/LICENSE) © [Risan Bagja Pradana](https://bagja.net)
