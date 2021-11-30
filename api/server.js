const express = require('express');

const postRoutes = require("../api/posts/posts-router");

const server = express();

server.use(express.json());

server.use("/api/posts", postRoutes);

module.exports = server;

