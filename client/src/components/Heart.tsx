import * as React from 'react';
import { useEffect, useState } from 'react';
import { faHeart } from '@fortawesome/fontawesome-free-solid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { deleteRecipe, postRecipe } from '../Utils/apiDBService';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

const Heart = ({ recipe, setIds, ids }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentId, setCurrentId] = useState(0);

  useEffect(() => {
    ids.forEach((id) => {
      if (id.id_tasty === recipe.id || id.id_tasty === recipe.id_tasty) {
        setIsFavorite(true);
        setCurrentId(id.id);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids]);

  const isFavoriteHandler = () => {
    setIsFavorite(() => !isFavorite);
    if (!isFavorite) {
      const instructions = recipe.instructions.map((el) => {
        let text = el.display_text;
        return { text };
      });
      const ingredients = recipe.sections.map((el) => {
        const final = el.components.reduce((acc, comp) => {
          acc = [
            ...acc,
            {
              name: comp.ingredient.name,
              unit: comp.measurements[0].unit.name,
              quantity: comp.measurements[0].quantity || null,
            },
          ];
          return acc;
        }, []);
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
        instructions: instructions,
      };
      postRecipe(newRecipe)
        .then((res) => console.log(res))
        .catch((error) => console.log(error));

      setIds((prev) => [...prev, { id: currentId, id_tasty: recipe.id }]);
    } else {
      if (window.confirm('You are removing recipe. Are you sure?')) {
        deleteRecipe({ id: currentId })
          .then((res) => console.log(res))
          .catch((error) => console.log(error));
        setIds((prev) => {
          const filtered = prev.filter((id) => id.id !== currentId);
          return [...filtered];
        });
      }
    }
  };
  return isFavorite ? (
    <FontAwesomeIcon
      onClick={isFavoriteHandler}
      icon={faHeart as IconProp}
      className="text-2xl self-center mr-3 link text-error cursor-pointer"
    />
  ) : (
    <FontAwesomeIcon
      onClick={isFavoriteHandler}
      icon={faHeart as IconProp}
      className="text-2xl self-center mr-3 link-secondary cursor-pointer"
    />
  );
};

export default Heart;
