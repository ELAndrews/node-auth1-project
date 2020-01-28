const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");

module.exports = server => {
  server.use(helmet());
  server.use(express.json());
  server.use(cookieParser());
  server.use(cors());
  server.use(
    session({
      name: "sessionId",
      secret: "secretId",
      cookie: {
        maxAge: 1000 * 60 * 10,
        secure: false,
        httpOnly: false
      },
      resave: false,
      saveUninitialized: false
    })
  );
};
