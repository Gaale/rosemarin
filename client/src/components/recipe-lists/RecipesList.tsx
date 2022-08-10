import React from 'react';
import Recipe from './Recipe';
import TopSection from '../layout/TopSection';
import SearchForm from './SearchForm';

import { GeneralRecipe } from '../../types/RecipeTypes';
import { CustomId } from '../../types/CustomId';

type Props = {
  recipes: GeneralRecipe[];
  setRecipes: (recipesArr: GeneralRecipe[]) => void;
  setIds: (ids: CustomId[]) => void;
  ids: CustomId[];
};

const RecipesList = ({ recipes, setIds, ids, setRecipes }: Props) => {
  return (
    <>
      <TopSection></TopSection>
      <SearchForm setRecipes={setRecipes}></SearchForm>
      <ul className='bg-transparent container-grid max-w-7xl mx-auto pr-5 pl-5'>
        {recipes.map((recipe, i) =>
          i === 4 || i % 10 === 4 ? (
            <Recipe
              recipe={recipe}
              key={recipe.id}
              className={
                'horizontal span-col-4 card bg-base-100 shadow-xl flex-row'
              }
              setIds={setIds}
              ids={ids}
            ></Recipe>
          ) : i === 6 || i % 10 === 6 ? (
            <Recipe
              recipe={recipe}
              key={recipe.id}
              className={
                'vertical span-col-2 span-row-2 card bg-base-100 shadow-xl'
              }
              setIds={setIds}
              ids={ids}
            ></Recipe>
          ) : (
            <Recipe
              recipe={recipe}
              key={recipe.id}
              className={'vertical card bg-base-100 shadow-xl'}
              setIds={setIds}
              ids={ids}
            ></Recipe>
          )
        )}
      </ul>
    </>
  );
};

export default RecipesList;
