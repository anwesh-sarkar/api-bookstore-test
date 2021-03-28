const { defineFeature, loadFeature } = require("jest-cucumber");
const feature = loadFeature(
  "../../../integration tests/features/login/login.feature",
  {
    loadRelativePath: true,
  }
);
const { login } = require("../../../helpers/links");
const user = require("../../../helpers/user");
const { loginOptions } = require("../../../helpers/options");
const fetch = require("node-fetch");

defineFeature(feature, (test) => {
  let response;
  test("Successful login", ({ given, when, then }) => {
    given("the user has email and password", () => {
      user;
    });
    when("the user logs in", async () => {
      response = await fetch(login, loginOptions).then((response) =>
        response.json()
      );
    });
    then(/^the user receives a "(.*)"$/, () => {
      expect(response.token).toBeString();
    });
  });
});
