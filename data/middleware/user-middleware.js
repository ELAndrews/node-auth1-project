const express = require("express");
const Users = require("../models/users");

function validate(req, res, next) {
  Users.getUsers()
    .then(next())
    .catch(error => {
      console.log(error);
    });
}

module.exports = { validate };
