import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { postItem } from '../../Utils/apiDBServiceShoppingList';

import { GeneralRecipe } from '../../types/RecipeTypes';
import { ItemType } from '../../types/ItemType';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

type Props = {
  recipes: GeneralRecipe[];
  myRecipes: GeneralRecipe[];
  //   items :  ItemType[];
  setItems: Dispatch<SetStateAction<ItemType[]>>;
};

const RecipeDetails = ({ recipes, myRecipes, setItems }: Props) => {
  const [recipe, setRecipe] = useState<GeneralRecipe>(new GeneralRecipe());
  const [myRecipe, setMyRecipe] = useState<GeneralRecipe>(new GeneralRecipe());

  const { id } = useParams();

  useEffect(() => {
    const result = recipes.find((res) => +id! === res.id);
    console.log('OTHER', result);
    if (result) setRecipe(result);
  }, []);

  useEffect(() => {
    const result = myRecipes.find((res) => +id! === res.id);
    console.log('MINE', result);
    if (result) setMyRecipe(result);
  }, []);

  const addHandlerShoppingList = async (data: ItemType) => {
    const newItem: ItemType = {
      name: data.name,
      quantity: data.quantity,
      unit: data.unit,
    };

    try {
      const item = await postItem(newItem);

      setItems((prev) => {
        return [...prev, item];
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (recipe.name === 'string' && myRecipe.name === 'string') {
    return <></>;
  }
  return (
    <>
      <div className='h-[300px] flex justify-between items-center'>
        <div className='bg-top-img3 w-full h-full bg-auto bg-no-repeat bg-center bg-cover'></div>
      </div>
      <div className='bg-base-100 shadow-xl max-w-screen-xl m-auto my-20 prose lg:prose-xl'>
        <h2 className='card-title font-rufina-bold block text-center'>
          {recipe ? recipe.name : myRecipe.title}
        </h2>
        <div className='flex'>
          <figure className='max-w-lg ml-10'>
            <img
              src={
                recipe
                  ? recipe.thumbnail_url
                  : myRecipe.img_url
                  ? myRecipe.img_url
                  : myRecipe.img_data
                  ? myRecipe.img_data
                  : 'Image'
              }
              alt={recipe ? recipe.name : myRecipe.title}
            />
          </figure>
          <div>
            <p className='mx-28 pt-5'>
              {recipe ? recipe.description : myRecipe.description}
            </p>
          </div>
        </div>
        <div className='card-body'>
          <h3 className='font-rufina-bold block text-center mt-0'>
            Ingredients
          </h3>
          <div className='overflow-x-auto'>
            <table className='table w-5/6 m-auto relative z-0'>
              <thead>
                <tr>
                  <th>
                    <span className='pl-4'>Name</span>
                  </th>
                  <th>Quantity</th>
                  <th>Unit</th>
                  <th>Shopping List</th>
                </tr>
              </thead>
              <tbody>
                {recipe
                  ? recipe.ingredients?.map((ingr, i) => {
                      console.log(ingr);
                      return (
                        <tr key={i}>
                          <th>{ingr.name}</th>
                          <td>{ingr.quantity}</td>
                          <td>{ingr.unit}</td>
                          <td>
                            <FontAwesomeIcon
                              icon={'fa-solid fa-plus' as IconProp}
                              className='text-warning transition-all hover:text-2xl ml-10'
                              onClick={() =>
                                addHandlerShoppingList({
                                  name: ingr.name,
                                  quantity: ingr.quantity,
                                  unit: ingr.unit,
                                })
                              }
                            />
                          </td>
                        </tr>
                      );
                    })
                  : myRecipe.ingredients.map((ingr, i) => (
                      <tr key={i}>
                        <th>{ingr.name}</th>
                        <td>{ingr.quantity}</td>
                        <td>{ingr.unit}</td>
                        <td>
                          <FontAwesomeIcon
                            icon={'fa-solid fa-plus' as IconProp}
                            className='text-warning transition-all hover:text-2xl ml-10'
                            onClick={() =>
                              addHandlerShoppingList({
                                name: ingr.name,
                                quantity: ingr.quantity,
                                unit: ingr.unit,
                              })
                            }
                          />
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
          <h3 className='font-rufina-bold block text-center'>Instructions</h3>
          {recipe
            ? recipe.instructions?.map((instr, i) => (
                <p className='w-5/6 m-auto' key={i}>
                  {instr.text}
                </p>
              ))
            : myRecipe.instructions?.map((instr, i) => (
                <p className='w-5/6 m-auto' key={i}>
                  {instr.text}
                </p>
              ))}
          {myRecipe ? null : recipe.renditions ? (
            recipe.renditions?.map(
              (url, i) => (
                <a
                  key={i}
                  className='link-secondary text-center'
                  href={url.url}
                  target='_blank'
                  rel='noreferrer'
                >
                  {url.url}
                </a>
              ),
              <br />
            )
          ) : (
            <span></span>
          )}
          <div className='card-actions justify-end'>
            <button className='btn btn-warning'>Details</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecipeDetails;
