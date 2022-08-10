import React, { useEffect, useState } from 'react';
import TopSection from '../layout/TopSection';
import SearchForm from './SearchForm';
import Recipe from './Recipe';
import { getMyRecipes } from '../../Utils/apiDBService';
import recipe from './Recipe';
import { GeneralRecipe } from '../../types/RecipeTypes';
import { CustomId } from '../../types/CustomId';
type Props = {
	myRecipes: GeneralRecipe[];
	setMyRecipes: (recipesArr: GeneralRecipe[]) => void;
	setRecipes: (recipesArr: GeneralRecipe[]) => void;
	setIds: (ids: CustomId[]) => void;
	ids: CustomId[];
};

const MyRecipesList = ({ myRecipes, setMyRecipes, setIds, ids, setRecipes }: Props) => {
	useEffect(() => {
		getMyRecipes()
			// .then(recipes => console.log(recipes))
			.then((recipes) => setMyRecipes(recipes))
			.catch((err) => console.log.bind(err));
	}, [ids]);

	return (
		<div className="mb-20">
			<TopSection></TopSection>
			<div className="prose lg:prose-xl  m-auto mb-10 text-center">
				<h2 className="m-auto font-rufina-bold ">List of favourite recipes</h2>
			</div>
			<SearchForm setRecipes={setRecipes}></SearchForm>

			<ul className="bg-transparent container-grid max-w-7xl mx-auto pr-5 pl-5">
				{myRecipes.map((recipe, i) =>
					i === 4 ? (
						<Recipe
							recipe={recipe}
							key={recipe.id}
							className={'horizontal span-col-4 card bg-base-100 shadow-xl flex-row'}
							setIds={setIds}
							ids={ids}
						></Recipe>
					) : i === 6 ? (
						<Recipe
							recipe={recipe}
							key={recipe.id}
							className={'vertical span-col-2 span-row-2 card bg-base-100 shadow-xl'}
							setIds={setIds}
							ids={ids}
						></Recipe>
					) : i > 9 ? null : (
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
		</div>
	);
};

export default MyRecipesList;
