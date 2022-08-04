import * as React from 'react';
import { useState } from 'react';
import { getRandomRecipe } from '../Utils/apiService';
import { options } from '../data';
import { useNavigate } from 'react-router-dom';

const SearchForm = ({ setRecipes, categories }) => {
  const navigate = useNavigate();

  function searchHandler(event) {
    event.preventDefault();
    getRandomRecipe(event.target.search.value)
      // .then(recipes => console.log(recipes.results))
      //swap to commented line below if revert back to api
      .then((data) => setRecipes(data))
      // .then((data) => setRecipes(data.results))
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
