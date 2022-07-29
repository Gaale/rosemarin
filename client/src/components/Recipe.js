import React from 'react';
import {Link} from "react-router-dom";

const Recipe = ({ recipe }) => {
    return (
        <li className="card w-96 bg-base-100 shadow-xl">
            <figure><img src={ recipe.strMealThumb } alt={ recipe.strMeal }/></figure>
            <div className="card-body">
                <h2 className="card-title font-rufina-bold">{ recipe.strMeal }</h2>
                <div className="card-actions justify-end">
                    <Link to={/recipes/ + recipe.idMeal} className="btn btn-primary font-oxy-light">Details</Link>
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