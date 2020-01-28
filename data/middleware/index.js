const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const KnexSessionStore = require("connect-session-knex")(session);

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
      saveUninitialized: false,
      store: new KnexSessionStore({
        knex: require("../dbConfig"),
        tablename: "sessions",
        sidfieldname: "sid",
        createtable: true,
        clearInterval: 1000 * 60 * 60
      })
    })
  );
};
