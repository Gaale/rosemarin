"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Recipe_1 = __importDefault(require("../models/Recipe"));
const Ingredient_1 = __importDefault(require("../models/Ingredient"));
const Instruction_1 = __importDefault(require("../models/Instruction"));
const fs = require('fs');
const createRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ingredients = req.body.ingredients;
        const instructions = req.body.instructions;
        const session = req.session;
        const uid = session.uid;
        const newRecipe = yield Recipe_1.default.create({
            title: req.body.title,
            description: req.body.description,
            img_url: req.body.img_url,
            img_data: req.body.img_data,
            img_alt_text: req.body.img_alt_text,
            total_time: req.body.total_time,
            id_tasty: req.body.id_tasty,
            UserId: uid,
        });
        const recipeId = Number(newRecipe.getDataValue('id'));
        ingredients.map((ingredient) => {
            Ingredient_1.default.create({
                name: ingredient.name,
                unit: ingredient.unit,
                quantity: ingredient.quantity,
                recipeId: recipeId,
            });
        });
        instructions.map((instruction) => {
            Instruction_1.default.create({
                text: instruction.text,
                temperature: instruction.temperature,
                recipeId: recipeId,
            });
        });
        res.status(201).send({ message: 'Recipe has been successfully created' });
    }
    catch (err) {
        console.log(err);
        res.status(500).send({ message: 'Due to error recipe has not been created' });
    }
});
// const updateRecipe = async (
//   req: Request<any, any, RecipeType>,
//   res: Response
// ) => {
//   try {
//     const ingredients = req.body.ingredients;
//     const instructions = req.body.instructions;
//     const id = req.params.id;
//     const session: TypedSessionData = req.session;
//     await Recipe.destroy({ where: { id: id } });
//     const updatedRecipe = await Recipe.create({
//       title: req.body.title,
//       description: req.body.description,
//       img_url: req.body.img_url,
//       img_data: req.body.img_data,
//       img_alt_text: req.body.img_alt_text,
//       total_time: req.body.total_time,
//       id_tasty: req.body.id_tasty,
//       UserId: session.uid,
//     });
//     ingredients!.map((ingredient) => {
//       Ingredient.create({
//         name: ingredient.name,
//         unit: ingredient.unit,
//         quantity: ingredient.quantity,
//         recipeId: updatedRecipe.id,
//       });
//     });
//     instructions!.map((instruction) => {
//       Instruction.create({
//         text: instruction.text,
//         temperature: instruction.temperature,
//         recipeId: updatedRecipe.id,
//       });
//     });
//     res.status(200).send({ message: 'Recipe has been successfully updated' });
//   } catch (err) {
//     console.log(err);
//     res
//       .status(500)
//       .send({ message: 'Due to error recipe has not been updated' });
//   }
// };
const removeRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.body.id;
        const recipe = yield Recipe_1.default.findByPk(id);
        if (!recipe || !recipe.getDataValue('img_data')) {
            yield Recipe_1.default.destroy({ where: { id: id } });
        }
        else {
            const path = recipe.getDataValue('img_data');
            yield Recipe_1.default.destroy({ where: { id: id } });
            fs.unlinkSync(path);
        }
        res.status(200).send({ message: 'Recipe has been successfully removed' });
    }
    catch (err) {
        console.log(err);
        res.status(500).send({ message: 'Due to error recipe has not been created' });
    }
});
const getAllRecipes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const session = req.session;
        const userId = session.uid;
        const allRecipes = yield Recipe_1.default.findAll({
            where: { UserId: userId },
            include: ['Instructions', 'Ingredients'],
        });
        res.status(200).send(allRecipes);
    }
    catch (err) {
        console.log(err);
        res.status(500).send({ message: 'Due to error recipes have not been received' });
    }
});
module.exports = { createRecipe, removeRecipe, getAllRecipes };
