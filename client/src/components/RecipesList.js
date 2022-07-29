import React from 'react';
import Recipe from "./Recipe";

const RecipesList = ({ recipes, setRecipes }) => {
    return (
        <ul className="flex flex-wrap justify-evenly gap-6 mt-20">
            {recipes.map(recipe => <Recipe recipe={recipe} key={recipe.idMeal}></Recipe>)}
        </ul>
    );
};


export default RecipesList;