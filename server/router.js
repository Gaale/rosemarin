const express = require("express");
const router = express.Router();
const { createUser } = require('./controllers/userController');
const {createRecipe, removeRecipe, getAllRecipe, updateRecipe} = require("./controllers/recipeController");
const fileMiddleware = require("./middlewares/uploadFile.middleware");

router.post('/register', createUser);
router.post('/recipes', fileMiddleware, createRecipe);
router.put('/recipes/:id', fileMiddleware, updateRecipe);
router.delete('/recipes/:id', removeRecipe);
router.get('/recipes', getAllRecipe);
router.get('*', function (req, res) {
    res.status(404).send("<h1 style='margin: 50px auto; display: flex; justify-content: center'>Page Not found</h1>");
});

module.exports = router;