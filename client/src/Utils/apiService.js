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
			if (recipe.sections) {
				const componentInFormat = recipe.sections.map((element) => {
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
				let formattedIngredients = [];
				componentInFormat.forEach((ingArr) => {
					formattedIngredients = [...formattedIngredients, ...ingArr];
				});
				formattedRecipes.push({
					id: recipe.id,
					name: recipe.name,
					description: recipe.description,
					tags: recipe.tags,
					img_url: recipe.thumbnail_url,
					total_time: recipe.total_time_minutes,
					ingredients: formattedIngredients,
					renditions: recipe.renditions,

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
	console.log(tag);
	return tag === undefined
		? formattedRecipes
		: formattedRecipes.filter((recipe) => {
				return recipe.tags.some((recipeTag) => {
					return recipeTag.name === tag;
				});
		  });
};

/*


*/
