import React from 'react';
import {getSearchedByCategory} from "../Utils/apiService";

const SearchForm = ({setRecipes, categories}) => {
    function searchHandler(event) {
        event.preventDefault();
        let str = event.target.search.value.trim();
        console.log(str);
        getSearchedByCategory(str).then(newRecipes => {
            setRecipes(newRecipes.meals);
        })
    }

    return (
        <div className="form-control">
            <div className="input-group">
                <form className="flex" onSubmit={searchHandler}>
                    <select className="select select-secondary max-w-xs w-40" placeholder="Search by category" name="search">
                        {categories.map(cats => <option value={cats.strCategory} key={cats.idCategory}>{cats.strCategory}</option>)}
                    </select>
                    <button type="submit" className="btn btn-square btn-info mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                        </svg>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SearchForm;