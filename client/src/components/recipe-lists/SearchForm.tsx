import React, { FormEvent, useState } from 'react';
import { getRandomRecipe } from '../../Utils/apiService';
import { options } from '../../data';
import { useNavigate } from 'react-router-dom';
import { GeneralRecipe, MyRecipe, RecipeType } from '../../types/RecipeTypes';

type Props = {
	setRecipes: (recipes: GeneralRecipe[]) => void;
};

const SearchForm = ({ setRecipes /*categories*/ }: Props) => {
	const navigate = useNavigate();

	function searchHandler(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		getRandomRecipe(event.currentTarget.value)
			// .then(recipes => console.log(recipes.results))
			.then((data: GeneralRecipe[]): void => {
				setRecipes(data);
			})
			.catch((err) => console.log.bind(err));
		navigate('../home', { replace: true });
	}

	return (
		<div className="form-control">
			<div className="input-group">
				<form
					className="w-full m-8 flex justify-center items-center"
					onSubmit={searchHandler}
				>
					<h3 className="font-rufina-bold text-2xl mr-8 subpixel-antialiased">
						Let's find something special
					</h3>
					<select
						className="select select-bordered w-1/3"
						placeholder="Search by category"
						name="search"
					>
						{options.map((option) => (
							<option value={option.name} key={option.id}>
								{option.display_name}
							</option>
						))}
					</select>
					<button type="submit" className="btn btn-neutral">
						Search
					</button>
				</form>
			</div>
		</div>
	);
};

export default SearchForm;
