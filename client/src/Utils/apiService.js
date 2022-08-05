import { recipeCache } from '../data';

const headers = {
	'X-RapidAPI-Key': '20d2d622c5mshefaea8f4fc1579fp145ccbjsn1662f35c8e98',
	'X-RapidAPI-Host': 'tasty.p.rapidapi.com',
};
const baseURL = 'https://tasty.p.rapidapi.com/recipes/list?from=0&size=20';

export const getRandomRecipe = async (tag) => {
	// let tagURL = '';
	// if(tag) tagURL = `&tags=${tag}`;

	// const options = {
	// 	method: 'GET',
	// 	headers: headers
	// };
	// return await fetch(`${baseURL}${tagURL}`, options)
	// 	.then(response => response.json())
	// 	.catch(err => console.error.bind(err));
	const formattedRecipes = [];
	recipeCache.forEach((recipe) => {
		try {
			//FORMAT THE DATA BEFORE ASIGNING
			if (recipe.sections) {
				const componentInFormat = recipe.sections.map((element) => {
					// return ingredientObject
					// { name, unit, quantity}
					const ingredients = [];
					element.components.forEach((comp) => {
						let name = comp.ingredient.name;
						let unit = comp.measurements[0]?.unit.name;
						let quantity = comp.measurements[0]?.quantity || null;
						ingredients.push({ name, unit, quantity });
					});
					// console.log(element);
					return ingredients;
				});

				console.log('FORMATED INGREDIENTS', componentInFormat);

				let formattedIngredients = [];
				componentInFormat.forEach((ingArr) => {
					formattedIngredients = [...formattedIngredients, ...ingArr];
				});

				formattedRecipes.push({
					id: recipe.id,
					name: recipe.name,
					description: recipe.description,
					img_url: recipe.thumbnail_url,
					total_time: recipe.total_time_minutes,
					ingredients: formattedIngredients,
					// ingredients: recipe.sections.map((el) => {
					// 	// console.log('ELEMENT INSIDE MAP', el);
					// 	let res = el.components.map((comp) => {
					// 		// if
					// 		let name = comp.ingredient.name;
					// 		let unit = comp.measurements[0]?.unit.name;
					// 		let quantity = comp.measurements[0]?.quantity || null;
					// 		return { name, unit, quantity };
					// 	});

					// 	// {NAME / UNIT /QUIANTITY}
					// 	return res;
					// 	// return final.flat();
					// }),
					instructions: recipe.instructions.map((el) => {
						let text = el.display_text;
						return { text };
					}),
				});
			}
		} catch (error) {
			console.log(error);
		}
	});
	return formattedRecipes;
};

/*


*/
