import { Request, Response } from 'express';
const express = require("express");
const router = express.Router();
const { createUser, loginUser, profileUser, logoutUser} = require('./controllers/userController');
const {createRecipe, removeRecipe, getAllRecipes, updateRecipe} = require("./controllers/recipeController");
const fileMiddleware = require("./middlewares/uploadFileMiddleware");
const {addItem, updateItem, removeItem, getAllItems} = require("./controllers/shoppingListController");
const authMiddleware = require("./middlewares/authMiddleware");


router.post('/register', createUser);
router.post('/login', loginUser);
router.get('/me', authMiddleware, profileUser);
router.get('/logout', authMiddleware, logoutUser);

router.post('/recipes', fileMiddleware, createRecipe);
router.put('/recipes/:id', fileMiddleware, updateRecipe);
router.delete('/recipes', removeRecipe);
router.get('/recipes', getAllRecipes);

router.post('/items', addItem);
router.put('/items', updateItem);
router.delete('/items', removeItem);
router.get('/items', getAllItems);

router.get('*', function (req: Request, res: Response) {
// router.get('*', function (req, res) {
    res.status(404).send("<h1 style='margin: 50px auto; display: flex; justify-content: center'>Page Not found</h1>");
});

module.exports = router;