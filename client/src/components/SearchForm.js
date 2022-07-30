import React, {useState} from 'react';
import {getSearchedByCategory} from "../Utils/apiService";
import {options} from '../data';

const SearchForm = ({setRecipes, categories}) => {

    const [singleSelections, setSingleSelections] = useState([]);
    function searchHandler(event) {
        event.preventDefault();


    }

    return (
        <div className="form-control">
            <div className="input-group">
                <form className="w-full m-8 flex justify-center items-center" onSubmit={searchHandler}>
                    <h3 className="font-rufina-bold text-2xl mr-8 subpixel-antialiased">Let's find something special</h3>
                    <select className="select select-bordered w-1/3" placeholder="Search by category" name="search">
                        {/*{categories.map(cats => <option value={cats.strCategory} key={cats.idCategory}>{cats.strCategory}</option>)}*/}
                        {options.map(option => <option value={option.display_name} key={option.id}>{option.display_name}</option>)}
                    </select>
                    <button type="submit" className="btn btn-neutral">Search</button>
                </form>
            </div>
        </div>
    );
};

export default SearchForm;