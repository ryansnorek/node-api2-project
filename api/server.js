const express = require('express');

const postRoutes = require("../api/posts/posts-router");

const server = express();

// server.use(express.json());
server.use("/api/posts", postRoutes);

// GET all posts 

// GET post by ID /api/posts/:id

// POST	/api/posts

// PUT	/api/posts/:id

// DELETE	/api/posts/:id

// GET	/api/posts/:id/comments



// require your posts router and connect it here

// const postRoutes = require("./path")
// server.use("/posts", postsRoutes);

module.exports = server;

