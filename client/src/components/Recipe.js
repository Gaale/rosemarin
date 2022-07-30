import React from 'react';
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart} from "@fortawesome/fontawesome-free-solid";

const Recipe = ({ recipe, className }) => {
    return (
        <li className={className}>
            <figure><img  src={ recipe.thumbnail_url } alt={ recipe.name }/></figure>
            <div className="card-body">
                <h2 className="card-title font-rufina-bold">{ recipe.name }</h2>

                <div className="card-actions justify-end flex justify-between">
                    {/*<FontAwesomeIcon icon={faHeart} className="text-2xl self-center mr-3 link text-error cursor-pointer"/>*/}
                    <FontAwesomeIcon icon={faHeart} className="text-2xl self-center mr-3 link-secondary cursor-pointer"/>
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