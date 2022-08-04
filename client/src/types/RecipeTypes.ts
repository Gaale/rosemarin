import { Ingredient } from './Ingredient';
import { Instruction } from './Instruction';

export type MyRecipe = {
	title: string;
	img_url?: string;
	img_data?: string;
	description?: string;
	Ingredients: Ingredient[];
	Instructions: Instruction[];
	UserId: number;
	createdAt: string;
	updatedAt: string;
	id: number;
	id_tasty: number;
	img_alt_text: string;
	total_time: number;
};

export type RecipeType = {
	name: string;
	thumbnail_url: string;
	instructions: string; //Change
};
