const express = require("express");
const router = express.Router();
const { createUser } = require('./controllers/userController');
const {createRecipe, removeRecipe, getAllRecipe} = require("./controllers/recipeController");

router.post('/register', createUser);
router.post('/recipes', createRecipe);
router.delete('/recipes/:id', removeRecipe);
router.get('/recipes', getAllRecipe);
router.get('*', function (req, res) {
    res.status(404).send("<h1 style='margin: 50px auto; display: flex; justify-content: center'>Page Not found</h1>");
});

module.exports = router;