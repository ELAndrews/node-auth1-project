const express = require("express");
const Users = require("../models/users");
const bcrypt = require("bcryptjs");

module.exports = {
  validateRequestFullBody,
  validateUsername,
  userProtectedRoute,
  adminProtectedRoute
};

function validateRequestFullBody(req, res, next) {
  if (req.body.username && req.body.password) {
    next();
  } else if (req.body.username || req.body.password) {
    res.status(400).json(`Please provide a valide username AND password`);
  } else {
    res
      .status(400)
      .json(`You must provide both a valide username AND password`);
  }
}

function validateUsername(req, res, next) {
  Users.getUsers()
    .then(users => {
      let usernames = users.map(curr => curr.username);
      if (usernames.includes(req.body.username)) {
        next();
      } else {
        res.status(400).json(`This is an invalid username`);
      }
    })
    .catch(error => {
      res.status(400).json(`Error validating username`);
    });
}

function userProtectedRoute(req, res, next) {
  if (req.session.loggedInUser) {
    next();
  } else {
    res.status(400).json({
      message: "no cookie, OR cookie without a valid session id in the monkey"
    });
  }
}

function adminProtectedRoute(req, res, next) {
  if (req.session.loggedAsAdmin) {
    next();
  } else {
    res.status(400).json({
      message: "no cookie, OR cookie without a valid session id in the monkey"
    });
  }
}
