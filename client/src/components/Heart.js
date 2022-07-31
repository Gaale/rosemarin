import React, {useEffect, useState} from 'react';
import {faHeart} from "@fortawesome/fontawesome-free-solid";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {deleteRecipe, getMyRecipes, postRecipe} from "../Utils/apiDBService";


const Heart = ({recipe, setIds, ids}) => {

    const [isFavorite, setIsFavorite] = useState(false);
    const [currentId, setCurrentId] = useState(0);


    useEffect(() => {
        ids.map(id => {
            if (id.id_tasty === recipe.id) {
                setIsFavorite(true);
                setCurrentId(id.id);
            }
        })
    }, [ids]);

    const isFavoriteHandler = () => {
        setIsFavorite(() => !isFavorite);
        if (!isFavorite) {
            const instructions = recipe.instructions.map(el => {
                let text = el.display_text;
                return {text}
            })
            const ingredients = recipe.sections.map(el => {
                let final = [];
                let res = el.components.map(comp => {
                    let name = comp.ingredient.name;
                    let unit = comp.measurements[0].unit.name;
                    let quantity = comp.measurements[0].quantity || null;
                    return {name, unit, quantity};
                })
                final.push(res);
                return final.flat();
            });

            const newRecipe = {
                title: recipe.name,
                description: recipe.description,
                img_url: recipe.thumbnail_url,
                img_alt_text: recipe.name,
                total_time: recipe.total_time_minutes,
                id_tasty: recipe.id,
                ingredients: ingredients.flat(),
                instructions: instructions
            }
            postRecipe(newRecipe)
                .then(res => console.log(res))
                .catch(error => console.log(error))

            setIds(prev => [...prev, {id: currentId, id_tasty: recipe.id}]);

        } else {
            deleteRecipe({id: currentId})
                .then(res => console.log(res))
                .catch(error => console.log(error))
            setIds(prev => {
                const filtered = prev.filter(id => id.id !== currentId);
                return [...filtered]
            })

        }

    }
    return (
        (isFavorite) ?
            <FontAwesomeIcon
                onClick={isFavoriteHandler}
                icon={faHeart}
                className="text-2xl self-center mr-3 link text-error cursor-pointer"/> :
            <FontAwesomeIcon
                onClick={isFavoriteHandler}
                icon={faHeart}
                className="text-2xl self-center mr-3 link-secondary cursor-pointer"/>
    );
};

export default Heart;