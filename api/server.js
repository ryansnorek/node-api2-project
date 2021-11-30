const express = require('express');

const postRoutes = require("../api/posts/posts-router");

const server = express();

server.use("/api/posts", postRoutes);

module.exports = server;

