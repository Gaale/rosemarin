import React, {useEffect, useState} from 'react';
import {faHeart} from "@fortawesome/fontawesome-free-solid";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {deleteRecipe, getMyRecipes, postRecipe} from "../Utils/apiDBService";


const Heart = ({recipe, setIds, ids}) => {

    // const [isFavorite, setIsFavorite] = useState(false);
    //
    // let dbId = 0;
    // useEffect(() => {
    //     ids.map(id => {
    //         if(id === recipe.id){
    //             setIsFavorite(true);
    //             dbId = id;
    //         }
    //     })
    // }, []);
    //
    // const isFavoriteHandler = () => {
    //     setIsFavorite(() => !isFavorite);
    //     if(isFavorite){
    //         const newRecipe = {
    //             title: recipe.name,
    //             description: recipe.description,
    //             img_url: recipe.thumbnail_url,
    //             img_alt_text: recipe.name,
    //             total_time: recipe.total_time_minutes,
    //             id_tasty: recipe.id,
    //             ingredients: [
    //                 {
    //                     name: 'water'
    //                 }
    //             ],
    //             instructions: [
    //                 {
    //                     text: 'cook'
    //                 }
    //             ]
    //         }
    //         postRecipe(newRecipe)
    //             .then(res => console.log(res))
    //             .catch(error => console.log(error))
    //
    //         setIds(prev => [...prev, dbId]);
    //
    //     } else {
    //         if(dbId) {
    //             deleteRecipe(dbId)
    //                 .then(res => console.log(res))
    //                 .catch(error => console.log(error))
    //             setIds(prev => {
    //                 return prev.filter(id => id !== dbId)
    //             })
    //         }
    //     }
    //
    // }
    // return (
    //     (isFavorite) ?
    //     <FontAwesomeIcon
    //         onClick={isFavoriteHandler}
    //         icon={faHeart}
    //         className="text-2xl self-center mr-3 link text-error cursor-pointer"/> :
    //     <FontAwesomeIcon
    //         onClick={isFavoriteHandler}
    //         icon={faHeart}
    //         className="text-2xl self-center mr-3 link-secondary cursor-pointer"/>
    // );
};

export default Heart;