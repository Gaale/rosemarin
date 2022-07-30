import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { getSearchedById } from "../Utils/apiService";


const RecipeDetails = ({recipes}) => {
    const [recipe, setRecipe] = useState({});

    const { id } = useParams();

    useEffect(() => {
        setRecipe(recipes.find(res => id === res.id))
    }, [])

    // getSearchedById(id).then(result => {
    //     return setRecipe(result.meals[0])
    // }).catch(err => console.log.bind(err));

    return (
        <div className="bg-base-100 shadow-xl mt-40">
            {/*<div>*/}
            {/*    <figure><img src={ recipe.thumbnail_url } alt={ recipe.name }/></figure>*/}
            {/*</div>*/}
            {/*<div className="card-body">*/}
            {/*    <h2 className="card-title">{ recipe.name }</h2>*/}
            {/*    <p>{ recipe.description }</p>*/}
            {/*    <div className="card-actions justify-end">*/}
            {/*        <button className="btn btn-primary">Details</button>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    );
};

export default RecipeDetails;