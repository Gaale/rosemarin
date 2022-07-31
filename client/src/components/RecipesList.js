import React from 'react';
import Recipe from "./Recipe";
import TopSection from "./TopSection";
import SearchForm from "./SearchForm";

const RecipesList = ({recipes, setIds, ids, setRecipes}) => {
    return (
        <>
            <TopSection></TopSection>
            <SearchForm setRecipes={setRecipes}></SearchForm>
            <ul className="bg-transparent container-grid max-w-7xl mx-auto pr-5 pl-5">
                {recipes.map((recipe, i) =>
                    (i === 4) ?
                        <Recipe
                            recipe={recipe}
                            key={recipe.id}
                            className={"horizontal span-col-4 card bg-base-100 shadow-xl flex-row"}
                            setIds={setIds}
                            ids={ids}
                        ></Recipe> :
                        (i === 6) ?
                            <Recipe
                                recipe={recipe}
                                key={recipe.id}
                                className={"vertical span-col-2 span-row-2 card bg-base-100 shadow-xl"}
                                setIds={setIds}
                                ids={ids}
                            ></Recipe> :
                            (i > 9) ? null :
                                <Recipe
                                    recipe={recipe}
                                    key={recipe.id}
                                    className={"vertical card bg-base-100 shadow-xl"}
                                    setIds={setIds}
                                    ids={ids}
                                ></Recipe>
                )}
            </ul>
        </>
    );
};


export default RecipesList;