import React, { useEffect, useState } from 'react';
import { faHeart } from '@fortawesome/fontawesome-free-solid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { deleteRecipe, getMyRecipes, postRecipe } from '../Utils/apiDBService';
import { GeneralRecipe, MyRecipe } from '../types/RecipeTypes';
import { CustomId } from '../types/CustomId';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

type Props = {
  recipe: GeneralRecipe;
  setIds: (ids: CustomId[]) => void;
  ids: CustomId[]; //{id: 6, id_tasty: null}
};

const Heart = ({ recipe, setIds, ids }: Props) => {
  // console.log(recipe);
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentId, setCurrentId] = useState(0);

  useEffect(() => {
    ids.map((id) => {
      if (id.id_tasty === recipe.id || id.id_tasty === recipe.id_tasty) {
        setIsFavorite(true);
        setCurrentId(id.id);
      }
    });
  }, [ids]);

  const isFavoriteHandler = () => {
    setIsFavorite(() => !isFavorite);
    if (!isFavorite) {
      // const instructions = recipe.instructions.map((el) => {
      // 	let text = el.display_text;
      // 	return { text };
      // });
      // const ingredients = recipe.sections.map((el) => {
      // 	let final = [];
      // 	let res = el.components.map((comp) => {
      // 		let name = comp.ingredient.name;
      // 		let unit = comp.measurements[0].unit.name;
      // 		let quantity = comp.measurements[0].quantity || null;
      // 		return { name, unit, quantity };
      // 	});
      // 	final.push(res);
      // 	return final.flat();
      // });

      const newRecipe = {
        title: recipe.name,
        description: recipe.description,
        img_url: recipe.thumbnail_url,
        img_alt_text: recipe.name,
        // total_time: recipe.total_time_minutes,
        id_tasty: recipe.id,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions,
      };
      postRecipe(newRecipe)
        .then((res) => console.log(res))
        .catch((error) => console.log(error));

      // setIds((prev) => [...prev, { id: currentId, id_tasty: recipe.id }]);
      setIds([...ids, { id: currentId, id_tasty: recipe.id }]);
    } else {
      if (window.confirm('You are removing recipe. Are you sure?')) {
        deleteRecipe({ id: currentId })
          .then((res) => console.log(res))
          .catch((error) => console.log(error));

        setIds(ids.filter((id: CustomId) => id.id !== currentId));
        // setIds((prev) => {
        // 	const filtered = prev.filter((id) => id.id !== currentId);
        // 	return [...filtered];
        // });
      }
    }
  };
  return isFavorite ? (
    <FontAwesomeIcon
      data-testid='icon-fav'
      onClick={isFavoriteHandler}
      icon={faHeart as IconDefinition}
      className='text-2xl self-center mr-3 link text-error cursor-pointer'
    />
  ) : (
    <FontAwesomeIcon
      data-testid='icon-no-fav'
      onClick={isFavoriteHandler}
      icon={faHeart as IconDefinition}
      className='text-2xl self-center mr-3 link-secondary cursor-pointer'
    />
  );
};

export default Heart;
