import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSearchedById } from "../Utils/apiService";


const RecipeDetails = () => {
    const [recipe, setRecipe] = useState({});
    const { id } = useParams();

    getSearchedById(id).then(result => {
        return setRecipe(result.meals[0])
    }).catch(err => console.log.bind(err));


    return (
        <div className="bg-base-100 shadow-xl mt-40">
            <div>
                <figure><img src={ recipe.strMealThumb } alt={ recipe.strMeal }/></figure>
            </div>
            <div className="card-body">
                <h2 className="card-title">Here should be</h2>
                <h2 className="card-title">{ recipe.strMeal }</h2>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary">Details</button>
                </div>
            </div>
        </div>
    );
};

export default RecipeDetails;