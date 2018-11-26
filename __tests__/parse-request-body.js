/* global expect:false, jest:false, test:false */
const { Readable } = require("stream");
const FormData = require("form-data");
const parseFormData = require("../src/parse-form-data");
const parseRequestBody = require("../src/parse-request-body");

jest.mock("../src/parse-form-data");

test("it returns empty object if there's no body argument", async () => {
  const body1 = await parseRequestBody();
  expect(body1).toEqual({});

  const body2 = await parseRequestBody({});
  expect(body2).toEqual({});
});

test("it can parse body as form-urlencoded", async () => {
  const body = await parseRequestBody({ foo: "bar" });

  expect(body.stream).toBeInstanceOf(Readable);
  expect(typeof body.contentLength).toBe("number");
  expect(body.contentType).toBe("application/x-www-form-urlencoded");
});

test("it can parse body as JSON", async () => {
  const body = await parseRequestBody({ foo: "bar" }, { json: true });

  expect(body.stream).toBeInstanceOf(Readable);
  expect(typeof body.contentLength).toBe("number");
  expect(body.contentType).toBe("application/json");
});

test("it can parse body as form data", async () => {
  const form = new FormData();
  form.append("foo", "bar");

  parseFormData.mockReturnValue("foo");

  const body = await parseRequestBody(form);

  expect(body).toBe("foo");
  expect(parseFormData).toHaveBeenCalledTimes(1);
  expect(parseFormData).toHaveBeenCalledWith(form);
});
