const express = require("express");
const Users = require("../models/users");
const bcrypt = require("bcryptjs");

module.exports = { validateRequestFullBody, validateUsername, protectedRoute };

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

function protectedRoute(req, res, next) {
  const { username, password } = req.headers;

  if (username && password) {
    Users.login({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          next();
        } else {
          res.status(401).json({ message: "Invalid Credentials" });
        }
      })
      .catch(error => {
        res.status(500).json({ message: "Ran into an unexpected error" });
      });
  } else {
    res.status(400).json({ message: "No credentials provided" });
  }
}
