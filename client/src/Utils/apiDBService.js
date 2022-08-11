const baseDBUrl = 'http://localhost:3001/recipes';

export const getMyRecipes = async () => {
	return await fetch(baseDBUrl, {
		credentials: 'include',
	})
		.then((response) => response.json())
		// .then(response => console.log(response))
		.catch((err) => console.error.bind(err));
};

export const postRecipe = async (recipe) => {
	return fetch(baseDBUrl, {
		method: 'POST',
		headers: { 'Content-type': 'application/json' },
		credentials: 'include',

		body: JSON.stringify(recipe),
	})
		.then((res) => res.json())
		.catch((err) => console.log(err));
};

export const deleteRecipe = async (id) => {
	return fetch(baseDBUrl, {
		method: 'DELETE',
		headers: { 'Content-type': 'application/json' },
		body: JSON.stringify(id),
		credentials: 'include',
	})
		.then((res) => res.json())
		.catch((err) => console.log(err));
};
