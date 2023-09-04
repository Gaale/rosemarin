import { ItemType } from '../types/ItemType';
import { MyRecipe } from '../types/RecipeTypes';

export const baseDBUrl = 'http://localhost:3001/items';

export const getMyShoppingList = async () => {
	return await fetch(baseDBUrl, {
		credentials: 'include',
	})
		.then((response) => response.json())
		.catch((err) => console.error.bind(err));
};

export const postItem = async (item: ItemType): Promise<ItemType> => {
	const response = await fetch(baseDBUrl, {
		method: 'POST',
		headers: { 'Content-type': 'application/json' },
		body: JSON.stringify(item),
		credentials: 'include',
	});
	return (await response.json()) as ItemType;
};

export const deleteItem = async (id: Number) => {
	console.log(id);
	return fetch(baseDBUrl, {
		method: 'DELETE',
		headers: { 'Content-type': 'application/json' },
		body: JSON.stringify(id),
		credentials: 'include',
	})
		.then((res) => res.json())
		.catch((err) => console.log(err));
};
