import { Request, Response } from 'express';
import { RecipeType } from '../types/Recipe';
import { TypedSessionData } from '../types/TypedSession';

import Recipe from '../models/Recipe';
import Ingredient from '../models/Ingredient';
import Instruction from '../models/Instruction';
const fs = require('fs');

const createRecipe = async (req: Request<any, any, RecipeType>, res: Response) => {
	try {
		const ingredients = req.body.ingredients;
		const instructions = req.body.instructions;
		const session: TypedSessionData = req.session;
		const uid = session.uid;
		const newRecipe = await Recipe.create({
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

		ingredients!.map((ingredient) => {
			Ingredient.create({
				name: ingredient.name,
				unit: ingredient.unit,
				quantity: ingredient.quantity,
				recipeId: recipeId,
			});
		});

		instructions!.map((instruction) => {
			Instruction.create({
				text: instruction.text,
				temperature: instruction.temperature,
				recipeId: recipeId,
			});
		});

		res.status(201).send({ message: 'Recipe has been successfully created' });
	} catch (err) {
		console.log(err);
		res.status(500).send({ message: 'Due to error recipe has not been created' });
	}
};

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

const removeRecipe = async (req: Request<any, any, RecipeType>, res: Response) => {
	try {
		const id = req.body.id;
		const recipe = await Recipe.findByPk(id);
		if (!recipe || !recipe.getDataValue('img_data')) {
			await Recipe.destroy({ where: { id: id } });
		} else {
			const path = recipe.getDataValue('img_data');
			await Recipe.destroy({ where: { id: id } });
			fs.unlinkSync(path);
		}
		res.status(200).send({ message: 'Recipe has been successfully removed' });
	} catch (err) {
		console.log(err);
		res.status(500).send({ message: 'Due to error recipe has not been created' });
	}
};

const getAllRecipes = async (req: Request<RecipeType>, res: Response) => {
	try {
		const session: TypedSessionData = req.session;
		const userId = session.uid;
		const allRecipes = await Recipe.findAll({
			where: { UserId: userId },
			include: ['Instructions', 'Ingredients'],
		});
		res.status(200).send(allRecipes);
	} catch (err) {
		console.log(err);
		res.status(500).send({ message: 'Due to error recipes have not been received' });
	}
};

module.exports = { createRecipe, removeRecipe, getAllRecipes };
