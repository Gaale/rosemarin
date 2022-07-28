const express = require("express");
const router = express.Router();
const { createUser } = require('./controllers/userController');
const {createRecipe, removeRecipe, getAllRecipes, updateRecipe} = require("./controllers/recipeController");
const fileMiddleware = require("./middlewares/uploadFile.middleware");
const {addItem, updateItem, removeItem, getAllItems} = require("./controllers/shoppingListController");

router.post('/register', createUser);

router.post('/recipes', fileMiddleware, createRecipe);
router.put('/recipes/:id', fileMiddleware, updateRecipe);
router.delete('/recipes/:id', removeRecipe);
router.get('/recipes', getAllRecipes);

router.post('/items', addItem);
router.put('/items/:id', updateItem);
router.delete('/items/:id', removeItem);
router.get('/items', getAllItems);

router.get('*', function (req, res) {
    res.status(404).send("<h1 style='margin: 50px auto; display: flex; justify-content: center'>Page Not found</h1>");
});

module.exports = router;