import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { getSearchedById } from "../Utils/apiService";


const RecipeDetails = ({recipes, myRecipes, setIds}) => {
    const [recipe, setRecipe] = useState([]);
    const [myRecipe, setMyRecipe] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        if(id){
            const result = recipes.find(res => +id === res.id);
            setRecipe(result);
        }
    }, [id])

    useEffect(() => {
        if(id){
            const result = myRecipes.find(res => +id === res.id);
            setMyRecipe(result);
        }
    }, [id])

    // getSearchedById(id).then(result => {
    //     return setRecipe(result.meals[0])
    // }).catch(err => console.log.bind(err));

    return (
        <div className="bg-base-100 shadow-xl mt-40">
            <div>
                <figure className="w-1/2"><img src={ recipe.thumbnail_url || myRecipe.img_url || myRecipe.img_data} alt={ recipe.name || myRecipe.title}/></figure>
            </div>
            <div className="card-body">
                <h2 className="card-title">{ recipe.name || myRecipe.title }</h2>
                <p>{ recipe.description || myRecipe.description}</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary">Details</button>
                </div>
            </div>
        </div>
    );
};

export default RecipeDetails;