const db = require("../dbConfig");

module.exports = {
  getUsers,
  login,
  register
};

function getUsers() {
  return db("users");
}

function login(name) {
  return db("users").where(name);
}

function register({ username, password }) {
  return db("users").insert({ username, password });
}
