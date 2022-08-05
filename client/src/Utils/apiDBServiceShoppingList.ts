export const baseDBUrl = 'http://localhost:3001/items';

export const getMyShoppingList = async () => {
    return await fetch(baseDBUrl)
        .then(response => response.json())
        .catch(err => console.error.bind(err));
}

export const postItem = async (recipe) => {
    return fetch(baseDBUrl, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(recipe)
    })
        .then(res => res.json())
        .catch(err => console.log(err))
}

export const deleteItem = async (id) => {
    console.log(id);
    return fetch(baseDBUrl, {
        method: 'DELETE',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(id)
    })
        .then(res => res.json())
        .catch(err => console.log(err))
}