// import * as React from 'react';
// import { useRef, useState } from 'react';
// import TopSection from './TopSection';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import Instruction from './Instruction';
// import Ingredient from './Ingredient';
// import { postRecipe } from '../Utils/apiDBService';

// interface SubInstructionType {text: string}
// interface TmpIngredientsType {name: string, quantity: string, unit?: string}

// function CreateRecipe() {
//   const [ingredients, setIngredients] = useState(['1-ingredient']);
//   const [instructions, setInstructions] = useState(['1-instruction']);

//   const form = useRef<HTMLFormElement>(null);
//   // const form = useRef(null);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // let subInstructions = [];
//     let subInstructions:SubInstructionType[] = [];
//     // let tmpIngredients = [];
//     // let tmpIngredients:String[] = [];
//     let tmpIngredients:TmpIngredientsType[] = [];
//     // const formData = new FormData(form.current);
//     const formData = new FormData(form.current!);

//     for (let [key, value] of formData.entries()) {
//       if (key.includes('instruction') && typeof value == 'string') subInstructions.push({ text: value });
//       // if (key.includes('instruction')) subInstructions.push( value);
//     }

//     const map = new Map(formData.entries());
//     map.forEach((value, key) => {
//       if (!key.includes('ingredient')) map.delete(key);
//     });
//     console.log(map);

//     const tmpMap = new Map();
//     // const tmpMap = new Map<string, string>();
//     for (let i = 0; i < map.size; i++) {
//       map.forEach((value, key) => {
//         if (key.includes(`${i}`)) tmpMap.set(key.split('-')[0], value);
//       });
//       tmpIngredients.push(Object.fromEntries(tmpMap));
//     }

//     tmpIngredients = tmpIngredients.reduce((o, i) => {
//       if (!o.find((v:TmpIngredientsType) => v.name == i.name)) {
//         o.push(i);
//       }
//       return o;
//     }, []);

//     tmpIngredients.shift();

//     const newRecipe = {
//       title: e.target.title.value,
//       description: e.target.description.value,
//       img_url: e.target.url.value || null,
//       // files: e.target[7].files[0] || null,
//       img_alt_text: e.target.title.value,
//       ingredients: tmpIngredients,
//       instructions: subInstructions,
//     };
//     postRecipe(newRecipe)
//       .then((res) => console.log(res))
//       .catch((error) => console.log(error));

//     e.target.title.value = '';
//     e.target.description.value = '';
//     e.target.url.value = '';
//     e.target.title = '';
//   };

//   const addHandlerInstruction = () => {
//     setInstructions((prev) => {
//       let count = parseInt(prev[prev.length - 1], 10);
//       return [...prev, count + 1 + '-instruction'];
//     });
//   };

//   const delHandlerInstruction = () => {
//     setInstructions((prev) => {
//       let count = parseInt(prev[prev.length - 1], 10);
//       if (count < 2) count = 100;
//       const filtered = prev.filter((instr) => parseInt(instr) !== count);
//       return [...filtered];
//     });
//   };

//   const addHandlerIngredient = () => {
//     setIngredients((prev) => {
//       let count = parseInt(prev[prev.length - 1], 10);
//       return [...prev, count + 1 + '-ingredient'];
//     });
//   };

//   const delHandlerIngredient = () => {
//     setIngredients((prev) => {
//       let count = parseInt(prev[prev.length - 1], 10);
//       if (count < 2) count = 100;
//       const filtered = prev.filter((ingr) => parseInt(ingr) !== count);
//       return [...filtered];
//     });
//   };

//   return (
//     <>
//       <TopSection />
//       <form
//         ref={form}
//         encType='multipart/form-data'
//         onSubmit={handleSubmit}
//         className='w-2/3 m-auto form-control prose lg:prose-xl mb-40'
//       >
//         <h2 className='m-auto font-rufina-bold'>Create your own recipe</h2>
//         <div>
//           <label className='label'>Title</label>
//           <input
//             type='text'
//             name='title'
//             placeholder='Type here title of your recipe...'
//             className='input input-bordered w-full hover:bg-slate-50'
//           />
//         </div>

//         <div>
//           <label className='label'>Description</label>
//           <textarea
//             name='description'
//             placeholder='Type here description of your recipe...'
//             className='textarea input-bordered w-full hover:bg-slate-50 cursor-pointer'
//           />
//         </div>

//         <div>
//           <label className='label justify-start mr-10'>
//             Ingredients
//             <FontAwesomeIcon
//               icon='fa-solid fa-plus'
//               className='text-warning transition-all hover:text-2xl ml-10'
//               onClick={addHandlerIngredient}
//             />
//             <FontAwesomeIcon
//               icon='fa-solid fa-minus'
//               className='text-warning transition-all hover:text-2xl cursor-pointer ml-10'
//               onClick={delHandlerIngredient}
//             />
//           </label>
//           {ingredients.map((ingredient) => {
//             return <Ingredient ingredient={ingredient} key={ingredient} />;
//           })}
//         </div>

//         <div>
//           <label className='label justify-start mr-10'>
//             Instructions
//             <FontAwesomeIcon
//               icon='fa-solid fa-plus'
//               className='text-warning transition-all hover:text-2xl cursor-pointer ml-10'
//               onClick={addHandlerInstruction}
//             />
//             <FontAwesomeIcon
//               icon='fa-solid fa-minus'
//               className='text-warning transition-all hover:text-2xl cursor-pointer ml-10'
//               onClick={delHandlerInstruction}
//             />
//           </label>
//           {instructions.map((instruction) => {
//             return <Instruction instruction={instruction} key={instruction} />;
//           })}
//         </div>

//         <div>
//           <label className='label'>URL of image</label>
//           <input
//             type='input'
//             name='url'
//             placeholder='Type here URL if needed..'
//             className='input input-bordered w-full hover:bg-slate-50'
//           />
//         </div>

//         <div>
//           <label className='label'>Upload image</label>
//           <input
//             type='file'
//             name='file'
//             className='block w-full text-sm text-slate-500
//                        file:mr-4 file:py-2 file:px-4
//                        file:square file:border-0
//                        file:text-sm file:font-semibold
//                        file:bg-fuchsia-50 file:text-accent-700
//                        hover:file:bg-base-300 mb-10'
//           />
//         </div>

//         <button type='submit' className='btn btn-neutral font-rufina-regular'>
//           Submit
//         </button>
//       </form>
//     </>
//   );
// }

// export default CreateRecipe;

import React, { useRef, useState } from 'react';
import TopSection from './TopSection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Instruction from './Instruction';
import Ingredient from './Ingredient';
import { postRecipe } from '../Utils/apiDBService';

function CreateRecipe() {
  const [ingredients, setIngredients] = useState(['1-ingredient']);
  const [instructions, setInstructions] = useState(['1-instruction']);

  const form = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    let subInstructions = [];
    let tmpIngredients = [];
    const formData = new FormData(form.current);

    for (let [key, value] of formData.entries()) {
      if (key.includes('instruction')) subInstructions.push({ text: value });
    }

    const map = new Map(formData.entries());
    map.forEach((value, key) => {
      if (!key.includes('ingredient')) map.delete(key);
    });

    const tmpMap = new Map();
    for (let i = 0; i < map.size; i++) {
      map.forEach((value, key) => {
        if (key.includes(`${i}`)) tmpMap.set(key.split('-')[0], value);
      });
      tmpIngredients.push(Object.fromEntries(tmpMap));
    }

    // tmpIngredients = tmpIngredients.reduce((o, i) => {
    //   console.log({ o, i });
    //   if (
    //     !o.find((v) => {
    //       console.log({ v });
    //       return v.name == i.name;
    //     })
    //   ) {
    //     o.push(i);
    //   }
    //   console.log({ o });
    //   return o;
    // }, []);

    tmpIngredients = tmpIngredients.reduce((o, i) => {
      console.log({ o, i });
      if (
        !o.find((v) => {
          console.log({ v });
          return v.name == i.name;
        })
      ) {
        o.push(i);
      }
      console.log({ o });
      return o;
    }, []);

    tmpIngredients.shift();

    const newRecipe = {
      title: e.target.title.value,
      description: e.target.description.value,
      img_url: e.target.url.value || null,
      // files: e.target[7].files[0] || null,
      img_alt_text: e.target.title.value,
      ingredients: tmpIngredients,
      instructions: subInstructions,
    };
    postRecipe(newRecipe)
      .then((res) => console.log(res))
      .catch((error) => console.log(error));

    e.target.title.value = '';
    e.target.description.value = '';
    e.target.url.value = '';
    e.target.title = '';
  };

  const addHandlerInstruction = () => {
    setInstructions((prev) => {
      let count = parseInt(prev[prev.length - 1], 10);
      return [...prev, count + 1 + '-instruction'];
    });
  };

  const delHandlerInstruction = () => {
    setInstructions((prev) => {
      let count = parseInt(prev[prev.length - 1], 10);
      if (count < 2) count = 100;
      const filtered = prev.filter((instr) => parseInt(instr) !== count);
      return [...filtered];
    });
  };

  const addHandlerIngredient = () => {
    setIngredients((prev) => {
      let count = parseInt(prev[prev.length - 1], 10);
      return [...prev, count + 1 + '-ingredient'];
    });
  };

  const delHandlerIngredient = () => {
    setIngredients((prev) => {
      let count = parseInt(prev[prev.length - 1], 10);
      if (count < 2) count = 100;
      const filtered = prev.filter((ingr) => parseInt(ingr) !== count);
      return [...filtered];
    });
  };

  return (
    <>
      <TopSection></TopSection>
      <form
        ref={form}
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
              icon='fa-solid fa-plus'
              className='text-warning transition-all hover:text-2xl ml-10'
              onClick={addHandlerIngredient}
            />
            <FontAwesomeIcon
              icon='fa-solid fa-minus'
              className='text-warning transition-all hover:text-2xl cursor-pointer ml-10'
              onClick={delHandlerIngredient}
            />
          </label>
          {ingredients.map((ingredient) => {
            return <Ingredient ingredient={ingredient} key={ingredient} />;
          })}
        </div>

        <div>
          <label className='label justify-start mr-10'>
            Instructions
            <FontAwesomeIcon
              icon='fa-solid fa-plus'
              className='text-warning transition-all hover:text-2xl cursor-pointer ml-10'
              onClick={addHandlerInstruction}
            />
            <FontAwesomeIcon
              icon='fa-solid fa-minus'
              className='text-warning transition-all hover:text-2xl cursor-pointer ml-10'
              onClick={delHandlerInstruction}
            />
          </label>
          {instructions.map((instruction) => {
            return <Instruction instruction={instruction} key={instruction} />;
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
