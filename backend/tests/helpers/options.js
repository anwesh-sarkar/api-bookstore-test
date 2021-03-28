const user = require("./user");

const loginOptions = {
  method: "POST",
  headers: {
    "Content-type": "application/json",
  },
  body: JSON.stringify(user),
};

module.exports = { loginOptions };
