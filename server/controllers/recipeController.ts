import { Request, Response } from 'express';
const Recipe = require('../models/Recipe');
const IngredientModel = require('../models/Ingredient');
const InstructionModel = require('../models/Instruction');
const fs = require('fs');
import { Ingredient, Instruction  } from '../Types';


const createRecipe = async (req: Request, res: Response) => {
    try {
        const ingredients = req.body.ingredients;
        const instructions = req.body.instructions;
        const newRecipe = await Recipe.create({
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

        ingredients.map((ingredient: Ingredient) => {
            IngredientModel.create({
                name: ingredient.name,
                unit: ingredient.unit,
                quantity: ingredient.quantity,
                RecipeId: newRecipe.id
            });
        })

        instructions.map((instruction: Instruction) => {
            InstructionModel.create({
                text: instruction.text,
                temperature: instruction.temperature,
                RecipeId: newRecipe.id
            });
        })

        res.status(201).send({"message": "Recipe has been successfully created"});
    } catch (err) {
        console.log(err);
        res.status(500).send({"message": "Due to error recipe has not been created"});
    }
}


const updateRecipe = async (req: Request, res: Response) => {
    try {
        const ingredients = req.body.ingredients;
        const instructions = req.body.instructions;
        const id = req.params.id;
        await Recipe.destroy({where: {id: id}});
        const updatedRecipe = await Recipe.create({
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

        ingredients.map((ingredient: Ingredient) => {
            IngredientModel.create({
                name: ingredient.name,
                unit: ingredient.unit,
                quantity: ingredient.quantity,
                RecipeId: updatedRecipe.id
            });
        })

        instructions.map((instruction: Instruction) => {
            InstructionModel.create({
                text: instruction.text,
                temperature: instruction.temperature,
                RecipeId: updatedRecipe.id
            });
        })
        res.status(200).send({"message": "Recipe has been successfully updated"});
    } catch (err) {
        console.log(err);
        res.status(500).send({"message": "Due to error recipe has not been updated"});
    }
}

const removeRecipe = async (req: Request, res: Response) => {
    try {
        const id = req.body.id;
        const recipe = await Recipe.findByPk(id);
        if (!recipe || !recipe.img_data) {
            await Recipe.destroy({where: {id: id}});
        } else {
            const path = recipe.img_data;
            await Recipe.destroy({where: {id: id}});
            fs.unlinkSync(path);
        }
        res.status(200).send({"message": "Recipe has been successfully removed"});
    } catch (err) {
        console.log(err);
        res.status(500).send({"message": "Due to error recipe has not been created"})
    }
}

const getAllRecipes = async (req: Request, res: Response) => {
    try {
        //todo const userId = req.session.sid;
        const userId = 1;
        const allRecipes = await Recipe.findAll({where: {UserId: userId}, include: ["Instructions", "Ingredients"]});
        res.status(200).send(allRecipes);
    } catch (err) {
        console.log(err);
        res.status(500).send({"message": "Due to error recipes have not been received"})
    }
}


module.exports = {createRecipe, removeRecipe, updateRecipe, getAllRecipes}
