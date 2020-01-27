const express = require("express");

const routes = require("./data/router");
const allMiddleware = require("./data/middleware");

const server = express();

allMiddleware(server);

server.use("/api", routes);

module.exports = server;
