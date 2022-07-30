import React from 'react';
import Recipe from "./Recipe";

const RecipesList = ({recipes, setRecipes}) => {
    return (
        <ul className="bg-transparent container-grid max-w-7xl mx-auto pr-5 pl-5">
            {recipes.map((recipe, i) =>
                (i === 4) ?
                    <Recipe recipe={recipe} key={recipe.id} className={"horizontal span-col-4 card bg-base-100 shadow-xl flex-row"}></Recipe> :
                    (i === 6) ?
                        <Recipe recipe={recipe} key={recipe.id} className={"vertical span-col-2 span-row-2 card bg-base-100 shadow-xl"}></Recipe> :
                        (i > 9) ? null :
                        <Recipe recipe={recipe} key={recipe.id} className={"vertical card bg-base-100 shadow-xl"}></Recipe>
            )}
        </ul>
    );
};


export default RecipesList;