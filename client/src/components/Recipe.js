import React from 'react';
import {Link} from "react-router-dom";
import Heart from "./Heart";


const Recipe = ({ recipe, className, setIds, ids }) => {
    return (
        <li className={className}>
            <figure><img  src={ recipe.thumbnail_url } alt={ recipe.name }/></figure>
            <div className="card-body">
                <h2 className="card-title font-rufina-bold">{ recipe.name }</h2>

                <div className="card-actions justify-end flex justify-between">
                    <Heart recipe={recipe} setIds={setIds} ids={ids}/>
                    <Link to={/recipes/ + recipe.id} className="btn btn-warning font-oxy-light">Details</Link>
                </div>
            </div>
        </li>
    );
};


// <li className={className}>
//     <span>{lable}</span>
//     <p className="shortDate"><span>{moment(event.date).format('Do MMM')}</span></p>
//     <div className="eventWrapper">
//         <h3 className="titleEvent">{event.title}</h3>
//         <p className="info">{moment(event.date).format('LT')} - {moment(event.date).format('LL')}</p>
//         <p className="info">{event.venue}</p>
//     </div>
// </li>

export default Recipe;