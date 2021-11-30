const express = require('express');

const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).send("hello from GET users endpoint");
})

router.get("/:id", (req, res) => {
    const { id } = req.params;
    res.status(200).send(`hello from GET users ${id} endpoint`);
})

router.post("/", (req, res) => {
    res.status(200).send("hello from POST users endpoint");
})

module.exports = router;