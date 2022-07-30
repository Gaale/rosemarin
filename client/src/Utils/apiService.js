import {recipeCache} from "../data";

const headers = {
	'X-RapidAPI-Key': '20d2d622c5mshefaea8f4fc1579fp145ccbjsn1662f35c8e98',
	'X-RapidAPI-Host': 'themealdb.p.rapidapi.com'
};
const baseURL = 'https://themealdb.p.rapidapi.com'


export const getRandomRecipe = () => {
	// const options = {
	// 	method: 'GET',
	// 	headers: headers
	// };
    // return await fetch(`${baseURL}/randomselection.php`, options)
    // 	.then(response => response.json())
    // 	.catch(err => console.error.bind(err));
	return recipeCache;
}

export const getSearchedById = async (id) => {
	const options = {
		method: 'GET',
		headers: headers
	};

	return fetch(`${baseURL}/lookup.php?i=${id}`, options)
		.then(response => response.json())
		.catch(err => console.error.bind(err));
}

export const getCategory = async () => {
	const options = {
		method: 'GET',
		headers: headers
	};

	return fetch(`${baseURL}/categories.php`, options)
		.then(response => response.json())
		.catch(err => console.error.bind(err));
}

export const getSearchedByCategory = async (str) => {
	const options = {
		method: 'GET',
		headers: headers
	};
	return fetch(`${baseURL}/filter.php?c=${str}`, options)
		.then(response => response.json())
		.catch(err => console.error.bind(err));
}





