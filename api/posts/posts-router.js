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
        const body = await Posts.insert(req.body);
        const newPost = { ...body, ...req.body };
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
        const postToUpdate = await Posts.findById(req.params.id);
        if (postToUpdate) {
            await Posts.update(req.params.id, req.body);
            const updatedPost = await Posts.findById(req.params.id);
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
        const postToDelete = await Posts.findById(req.params.id);
        if (postToDelete) {
            const deletedPost = { ...postToDelete }
            await Posts.remove(req.params.id);
            return res.status(200).json(deletedPost);
        }
        res.status(404).json({ message: "The post with the specified ID does not exist"});
    } catch (e) {
        res.status(500).json({ message: "The post could not be removed" });
    }
})
// GET comments from post id
router.get("/:id/comments", async (req, res) => {
    try {
        const post = await Posts.findById(req.params.id);
        if (post) {
            const comments = await Posts.findCommentById(req.params.id);
            console.log(comments)
            
            return res.status(200).json();
        }
        res.status(404).json({ message: "The post with the specified ID does not exist" });
    } catch (e) {
        res.status(500).json({ message: "The comments information could not be retrieved" });
    }
})

module.exports = router;