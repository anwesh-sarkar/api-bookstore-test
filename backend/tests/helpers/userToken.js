class userToken {
  constructor(token) {
    this.token = token;
  }

  set setToken(jwt) {
    this.token = jwt;
  }
}

module.exports = userToken;
