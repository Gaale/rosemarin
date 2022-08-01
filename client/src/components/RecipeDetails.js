import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {getSearchedById} from "../Utils/apiService";
import {getMyRecipes} from "../Utils/apiDBService";
import instruction from "./Instruction";


const RecipeDetails = ({recipes, myRecipes, ids}) => {
    const [recipe, setRecipe] = useState({});
    const [myRecipe, setMyRecipe] = useState({});


    const {id} = useParams();

    useEffect(() => {
        if (id) {
            const result = recipes.find(res => +id === res.id);
            setRecipe(result);
        } else setRecipe({})
    }, [])

    useEffect(() => {
        if (id) {
            const result = myRecipes.find(res => +id === res.id);
            setMyRecipe(result);
        } else setRecipe({})
    }, [])


    return (
        <div className="bg-base-100 shadow-xl mt-40">
            <div className="flex">
                <figure className="max-w-1/2">
                    <img
                        src={recipe ? recipe.thumbnail_url : myRecipe.img_url ? myRecipe.img_url : myRecipe.img_data ? myRecipe.img_data : "Image"}
                        alt={recipe ? recipe.name : myRecipe.title}/>
                </figure>
                <div>
                    <h2 className="card-title">{recipe ? recipe.name : myRecipe.title}</h2>
                    <p>{recipe ? recipe.description : myRecipe.description}</p>
                    <h3>Ingredients</h3>
                    <div className="overflow-x-auto">
                        <table className="table w-5/6 m-auto">
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Quantity</th>
                                <th>Unit</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                (recipe) ?
                                    recipe.sections.map((section) => {
                                        return section.components.map((comp, i) => <tr key={i}><th>{ comp.ingredient.name}</th><td>{comp.measurements[0].quantity}</td><td>{comp.measurements[0].unit.name}</td></tr>)
                                    }) :
                                    myRecipe.Ingredients.map((ingr, i) => <tr key={i}><th>{ingr.name}</th><td>{ingr.quantity}</td><td>{ingr.unit}</td></tr>)
                            }
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
            <div className="card-body">
                {
                    (recipe) ?
                        recipe.instructions.map((instr, i) => <p key={i}>{instr.display_text}</p>) :
                        myRecipe.Instructions.map((instr, i) => <p key={i}>{instr.text}</p>)
                }
                <div className="card-actions justify-end">
                    <button className="btn btn-neutral">Back</button>
                    <button className="btn btn-warning">Details</button>
                </div>
            </div>
        </div>
    );
};

export default RecipeDetails;