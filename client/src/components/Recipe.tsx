import * as React from 'react';
import {Link} from "react-router-dom";
import Heart from "./Heart";


const Recipe = ({ recipe, className, setIds, ids }) => {
    // console.log({recipe})
    return (
        <li className={className}>
            <figure><img  src={ recipe.thumbnail_url || recipe.img_url || recipe.img_data } alt={ recipe.name || recipe.title }/></figure>
            <div className="card-body">
                <h2 className="card-title font-rufina-bold">{ recipe.name || recipe.title }</h2>

                <div className="card-actions flex justify-between">
                    {
                        (recipe.instructions || recipe.Instructions) ? <Heart recipe={recipe} setIds={setIds} ids={ids}/> : <div className="text-2xl self-center mr-3">&#127910;</div>
                    }

                    <Link to={/recipes/ + (recipe.id_tasty || recipe.id)} className="btn btn-warning font-rufina-regular">Details</Link>
                </div>
            </div>
        </li>
    );
};

export default Recipe;