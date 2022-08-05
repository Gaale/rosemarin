import * as React from 'react'
import {useState } from 'react';
import TopSection from './TopSection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {Ingredient} from '../Types';
import { postRecipe } from '../Utils/apiDBService';



function CreateRecipe() {
  const [ingredients, setIngredients] = useState([
    { name: '', quantity: '', unit: '' },
  ]);
  const [instructions, setInstructions] = useState(['']);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTmpIngredients = ingredients.reduce((ingreds: Ingredient[], ing) => {
      const itemIndex = ingreds.findIndex((item) => item.name === ing.name);
      if (itemIndex === -1) {
        ingreds = [...ingreds, ing];
      } else {
        ingreds[itemIndex].quantity = (
          Number(ingreds[itemIndex].quantity) + Number(ing.quantity)
        ).toString();
      }
      return ingreds;
    }, []);

    const data = {
      title: e.target.title.value,
      description: e.target.description.value,
      img_url: e.target.url.value || null,
      // files: e.target[7].files[0] || null,
      img_alt_text: e.target.title.value || null,
      ingredients: newTmpIngredients,
      instructions: instructions,
    };
    postRecipe(data)
      .then((res) => console.log(res))
      .catch((error) => console.log(error));

    // e.target.title.value = '';
    // e.target.description.value = '';
    // e.target.url.value = '';
    // e.target.title = '';
    e.target.reset()
  };

  const addHandlerIngredient = () => {
    setIngredients([...ingredients, { name: '', quantity: '', unit: '' }]);
  };

  const delHandlerIngredient = (index) => {
    if (ingredients.length === 1) return;
    const rows = [...ingredients];
    rows.splice(index, 1);
    setIngredients(rows);
  };

  const addHandlerInstruction = () => {
    setInstructions([...instructions, '']);
  };

  const delHandlerInstruction = (index) => {
    if (instructions.length === 1) return;
    const rows = [...instructions];
    rows.splice(index, 1);
    setInstructions(rows);
  };

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const list = [...ingredients];
    list[index][name] = value;
    setIngredients(list);
  };

  const handleChangeQuantity = (index, event) => {
    const { name, value } = event.target;
    const list = [...ingredients];
    if (list[index][name]) list[index][name] += value;
    list[index][name] = value;
    setIngredients(list);
  };

  const handleChangeInstructions = (index, event) => {
    const { value } = event.target;
    const list = [...instructions];
    list[index] = value;
    setInstructions(list);
  };

  return (
    <>
      <TopSection></TopSection>
      <form
        // ref={form}
        encType='multipart/form-data'
        onSubmit={handleSubmit}
        className='w-2/3 m-auto form-control prose lg:prose-xl mb-40'
      >
        <h2 className='m-auto font-rufina-bold'>Create your own recipe</h2>
        <div>
          <label className='label'>Title</label>
          <input
            type='text'
            name='title'
            placeholder='Type here title of your recipe...'
            className='input input-bordered w-full hover:bg-slate-50'
          />
        </div>

        <div>
          <label className='label'>Description</label>
          <textarea
            name='description'
            placeholder='Type here description of your recipe...'
            className='textarea input-bordered w-full hover:bg-slate-50 cursor-pointer'
          />
        </div>

        <div>
          <label className='label justify-start mr-10'>
            Ingredients
            <FontAwesomeIcon
              icon={'fa-solid fa-plus' as IconProp}
              className='text-warning transition-all hover:text-2xl ml-10'
              onClick={addHandlerIngredient}
            />
            <FontAwesomeIcon
              icon={'fa-solid fa-minus' as IconProp}
              className='text-warning transition-all hover:text-2xl cursor-pointer ml-10'
              onClick={delHandlerIngredient}
            />
          </label>
          {ingredients.map((data, i) => {
            const { name, quantity, unit } = data;
            return (
              <div key={i} className='flex justify-between mb-3'>
                <input
                  type='text'
                  id='name'
                  name='name'
                  value={name}
                  placeholder='Type here ingredient..'
                  className='input input-bordered w-1/3 hover:bg-slate-50'
                  onChange={(event) => handleChange(i, event)}
                />
                <input
                  type='number'
                  id='quantity'
                  value={quantity}
                  name='quantity'
                  placeholder='quantity..'
                  className='input input-bordered w-1/4 mr-3 mr-3 hover:bg-slate-50'
                  onChange={(event) => handleChange(i, event)}
                />
                <input
                  type='text'
                  id='unit'
                  value={unit}
                  name='unit'
                  placeholder='unit..'
                  className='input input-bordered w-1/3 hover:bg-slate-50'
                  onChange={(event) => handleChange(i, event)}
                />
              </div>
            );
          })}
        </div>

        <div>
          <label className='label justify-start mr-10'>
            Instructions
            <FontAwesomeIcon
              icon={'fa-solid fa-plus' as IconProp}
              className='text-warning transition-all hover:text-2xl cursor-pointer ml-10'
              onClick={addHandlerInstruction}
            />
            <FontAwesomeIcon
              icon={'fa-solid fa-minus' as IconProp}
              className='text-warning transition-all hover:text-2xl cursor-pointer ml-10'
              onClick={delHandlerInstruction}
            />
          </label>
          {instructions.map((data, i) => {
            return (
              <textarea
                key={i}
                name='instruction'
                id='instruction'
                value={data}
                placeholder='Type here instruction..'
                className='textarea input-bordered w-full hover:bg-slate-50'
                onChange={(event) => handleChangeInstructions(i, event)}
              />
            );
          })}
        </div>

        <div>
          <label className='label'>URL of image</label>
          <input
            type='input'
            name='url'
            placeholder='Type here URL if needed..'
            className='input input-bordered w-full hover:bg-slate-50'
          />
        </div>

        <div>
          <label className='label'>Upload image</label>
          <input
            type='file'
            name='file'
            className='block w-full text-sm text-slate-500
                       file:mr-4 file:py-2 file:px-4
                       file:square file:border-0
                       file:text-sm file:font-semibold
                       file:bg-fuchsia-50 file:text-accent-700
                       hover:file:bg-base-300 mb-10'
          />
        </div>

        <button type='submit' className='btn btn-neutral font-rufina-regular'>
          Submit
        </button>
      </form>
    </>
  );
}

export default CreateRecipe;
