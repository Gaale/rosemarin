const express = require("express");
const router = express.Router();
// const { getTopics, saveTopic, upVote, downVote, removeTopic } = require('./controllers/topicController');
const { createUser } = require('./controllers/userController');
const {createRecipe, removeRecipe} = require("./controllers/recipeController");

router.post('/register', createUser);
router.post('/recipes', createRecipe);
router.delete('/recipes/:id', removeRecipe);
router.get('*', function (req, res) {
    res.status(404).send("<h1>Page Not found</h1>");
});

module.exports = router;