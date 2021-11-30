const express = require('express');

const router = express.Router();

const Posts = require("./posts-model");

// GET all posts 
router.get("/", async (req, res) => {
    try {
        const posts = await Posts.find();
        res.status(200).json(posts);
    } catch (e) {
        res.status(500).json({ message: "The posts information could not be retrieved" });
    }
})  
// GET post by ID
router.get("/:id", async (req, res) => {
    try {
        const post = await Posts.findById(req.params.id);
        if (post) return res.status(200).json(post);

        res.status(404).json({ message: "The post with the specified ID does not exist" });
    } catch (e) {
        res.status(500).json({ message: "The post information could not be retrieved" });
    }
})
// POST	new post
router.post("/", async (req, res) => {
    if (!req.body.title || !req.body.contents) {
        return res.status(400).json({ message: "Please provide title and contents for the post" });
    }
    try {
        const newPost = await Posts.insert(req.body);
        res.status(201).json(newPost);
    } catch (e) {
        res.status(500).json({ message: "There was an error while saving the post to the database" });
    }
})
// PUT update post
router.put("/:id", async (req, res) => {
    if (!req.body.title || !req.body.contents) {
        return res.status(400).json({ message: "Please provide title and contents for the post" });
    }
    try {
        const postExists = await Posts.findById(req.params.id);
        if (postExists) {
            const updatedPost = await Posts.update(req.params.id, req.body);
            return res.status(200).json(updatedPost);
        }
        res.status(404).json({ message: "The post with the specified ID does not exist" });
    } catch (e) {
        res.status(500).json({ message: "The post information could not be modified" });
    }
})
// DELETE post
router.delete("/:id", async (req, res) => {
    try {
        const postExists = await Posts.findById(req.params.id);
        if (postExists) {
            const deletePost = await Posts.delete(req.params.id);
            return res.status(200).json(deletePost);
        }
        res.status(404).json({ message: "The post with the specified ID does not exist"});
    } catch (e) {
        res.status(500).json({ message: "The post could not be removed" });
    }
})
// GET	/api/posts/:id/comments
router.get("/:id/comments", async (req, res) => {
    try {
        const post = await Posts.findById(req.params.id);
        if (post) {
            const comment = await Posts.findCommentById(req.params.id);
            return res.status(200).json(comment);
        }
        res.status(404).json({ message: "The post with the specified ID does not exist" });
    } catch (e) {
        res.status(500).json({ message: "The comments information could not be retrieved" });
    }
})

module.exports = router;