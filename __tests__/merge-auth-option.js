/* global expect:false, test:false */
const mergeAuthOption = require("../src/merge-auth-option");

test("it can create a valid auth option from URL object", () => {
  expect(mergeAuthOption({ username: "john", password: "secret" })).toBe(
    "john:secret"
  );

  expect(mergeAuthOption({ username: "john" })).toBe("john");

  expect(mergeAuthOption({ username: "john", password: "" })).toBe("john");
});

test("it can create a valid auth option from auth object", () => {
  expect(
    mergeAuthOption({ auth: { username: "john", password: "secret" } })
  ).toBe("john:secret");

  expect(mergeAuthOption({ auth: { username: "john" } })).toBe("john");

  expect(mergeAuthOption({ auth: { username: "john", password: "" } })).toBe(
    "john"
  );
});

test("the auth object must override the URL object", () => {
  expect(
    mergeAuthOption({
      username: "john",
      password: "secret",
      auth: {
        username: "doe",
        password: "supersecret"
      }
    })
  ).toBe("doe:supersecret");

  expect(
    mergeAuthOption({
      username: "john",
      password: "secret",
      auth: {
        username: "doe"
      }
    })
  ).toBe("doe:secret");

  expect(
    mergeAuthOption({
      username: "john",
      password: "secret",
      auth: {
        password: "supersecret"
      }
    })
  ).toBe("john:supersecret");

  expect(
    mergeAuthOption({
      username: "john",
      password: "secret",
      auth: {
        username: "doe",
        password: ""
      }
    })
  ).toBe("doe");

  expect(
    mergeAuthOption({
      username: "john",
      password: "secret",
      auth: {
        username: "",
        password: ""
      }
    })
  ).toBeNull();
});

test("it returns null if username property is not exists", () => {
  expect(mergeAuthOption()).toBeNull();

  expect(mergeAuthOption({})).toBeNull();

  expect(mergeAuthOption({ password: "secret" })).toBeNull();

  expect(mergeAuthOption({ username: "", password: "secret" })).toBeNull();

  expect(mergeAuthOption({ auth: { password: "secret" } })).toBeNull();

  expect(
    mergeAuthOption({ auth: { username: "", password: "secret" } })
  ).toBeNull();
});
