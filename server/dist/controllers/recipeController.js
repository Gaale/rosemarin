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
const Recipe = require('../models/Recipe');
const Ingredient = require('../models/Ingredient');
const Instruction = require('../models/Instruction');
const fs = require('fs');
const createRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ingredients = req.body.ingredients;
        const instructions = req.body.instructions;
        const newRecipe = yield Recipe.create({
            title: req.body.title,
            description: req.body.description,
            img_url: req.body.img_url,
            img_data: req.image,
            img_alt_text: req.body.img_alt_text,
            total_time: req.body.total_time,
            id_tasty: req.body.id_tasty,
            //todo const userId = req.session.sid;
            UserId: 1
        });
        ingredients.map(ingredient => {
            Ingredient.create({
                name: ingredient.name,
                unit: ingredient.unit,
                quantity: ingredient.quantity,
                RecipeId: newRecipe.id
            });
        });
        instructions.map(instruction => {
            Instruction.create({
                text: instruction.text,
                temperature: instruction.temperature,
                RecipeId: newRecipe.id
            });
        });
        res.status(201).send({ "message": "Recipe has been successfully created" });
    }
    catch (err) {
        console.log(err);
        res.status(500).send({ "message": "Due to error recipe has not been created" });
    }
});
const updateRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ingredients = req.body.ingredients;
        const instructions = req.body.instructions;
        const id = req.params.id;
        yield Recipe.destroy({ where: { id: id } });
        const updatedRecipe = yield Recipe.create({
            title: req.body.title,
            description: req.body.description,
            img_url: req.body.img_url,
            img_data: req.image,
            img_alt_text: req.body.img_alt_text,
            total_time: req.body.total_time,
            id_tasty: req.body.id_tasty,
            //todo const userId = req.session.sid;
            UserId: 1
        });
        ingredients.map(ingredient => {
            Ingredient.create({
                name: ingredient.name,
                unit: ingredient.unit,
                quantity: ingredient.quantity,
                RecipeId: updatedRecipe.id
            });
        });
        instructions.map(instruction => {
            Instruction.create({
                text: instruction.text,
                temperature: instruction.temperature,
                RecipeId: updatedRecipe.id
            });
        });
        res.status(200).send({ "message": "Recipe has been successfully updated" });
    }
    catch (err) {
        console.log(err);
        res.status(500).send({ "message": "Due to error recipe has not been updated" });
    }
});
const removeRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.body.id;
        const recipe = yield Recipe.findByPk(id);
        if (!recipe || !recipe.img_data) {
            yield Recipe.destroy({ where: { id: id } });
        }
        else {
            const path = recipe.img_data;
            yield Recipe.destroy({ where: { id: id } });
            fs.unlinkSync(path);
        }
        res.status(200).send({ "message": "Recipe has been successfully removed" });
    }
    catch (err) {
        console.log(err);
        res.status(500).send({ "message": "Due to error recipe has not been created" });
    }
});
const getAllRecipes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //todo const userId = req.session.sid;
        const userId = 1;
        const allRecipes = yield Recipe.findAll({ where: { UserId: userId }, include: ["Instructions", "Ingredients"] });
        res.status(200).send(allRecipes);
    }
    catch (err) {
        console.log(err);
        res.status(500).send({ "message": "Due to error recipes have not been received" });
    }
});
module.exports = { createRecipe, removeRecipe, updateRecipe, getAllRecipes };
