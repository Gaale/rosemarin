import React, {useState} from "react";
import {useForm} from "react-hook-form";
import TopSection from "./TopSection";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Instruction from "./Instruction";
import Ingredient from "./Ingredient";
import {postRecipe} from "../Utils/apiDBService";


function CreateRecipe() {
    const [ingredients, setIngredients] = useState(['1-ingredient']);
    const [instructions, setInstructions] = useState(['1-instruction']);

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({mode: "onBlur"});

    const onSubmit = ({title, description, url, file, ...rest}) => {
        const subInstructions = [];
        const tmpIngredients = [];
        // const subIngredients = [];
        for(let [key, value] of Object.entries(rest)){
            if(key.includes('instruction')) instructions.push({text: value});
            if(key.includes('ingredient')) tmpIngredients.push({key, value});
        }
        // const file = files[0];
        // const formData = new FormData();
        // formData.append('file', file);

        console.log(file);
        const newRecipe = {
            title: title,
            description: description,
            img_url: url || null,
            file: file,
            img_alt_text: title,
            ingredients: [{ name: "water"}],
            instructions: subInstructions
        }
        postRecipe(newRecipe)
            .then(res => console.log(res))
            .catch(error => console.log(error))
    };


    const addHandlerInstruction = () => {
        setInstructions(prev => {
            let count = parseInt(prev[prev.length - 1], 10);
            return [...prev, count+1 + '-instruction']
        });
    }

    const delHandlerInstruction = () => {
        setInstructions(prev => {
            let count = parseInt(prev[prev.length - 1], 10);
            if (count < 2) count = 100;
            const filtered = prev.filter(instr => parseInt(instr) !== count)
            return [...filtered]
        })
    }

    const addHandlerIngredient = () => {
        setIngredients(prev => {
            let count = parseInt(prev[prev.length - 1], 10);
            return [...prev, count+1 + '-ingredient']
        });
    }

    const delHandlerIngredient = () => {
        setIngredients(prev => {
            let count = parseInt(prev[prev.length - 1], 10);
            if (count < 2) count = 100;
            const filtered = prev.filter(ingr => parseInt(ingr) !== count);
            return [...filtered]
        })
    }

    return (
        <>
            <TopSection></TopSection>
            <form onSubmit={handleSubmit(onSubmit)} className='w-2/3 m-auto form-control prose lg:prose-xl mb-40'>
                <h2 className="m-auto font-rufina-bold">Create your own recipe</h2>
                <div>
                    <label className="label">Title</label>
                    <input type="text"
                           {...register("title", {
                               required: {value: true, message: "This is required."}
                           })}
                           style={{borderColor: errors.title && "red"}}
                           placeholder="Type here title of your recipe..."
                           className="input input-bordered w-full hover:bg-slate-50"
                    />
                </div>

                <div>
                    <label className="label">Description</label>
                    <textarea
                        {...register("description", {
                            required: {value: true, message: "This is required."}
                        })}
                        style={{borderColor: errors.description && "red"}}
                        placeholder="Type here description of your recipe..."
                        className="textarea input-bordered w-full hover:bg-slate-50 cursor-pointer"
                    />
                </div>

                <div>
                    <label className="label justify-start mr-10">Ingredients
                        <FontAwesomeIcon
                            icon="fa-solid fa-plus"
                            className="text-warning transition-all hover:text-2xl ml-10"
                            onClick={addHandlerIngredient}
                        />
                        <FontAwesomeIcon
                            icon="fa-solid fa-minus"
                            className="text-warning transition-all hover:text-2xl cursor-pointer ml-10"
                            onClick={delHandlerIngredient}
                        />
                    </label>
                    {
                        ingredients.map(ingredient => {
                            return <Ingredient register={register} ingredient={ingredient} key={ingredient}/>
                        })
                    }
                </div>

                <div>
                    <label className="label justify-start mr-10">Instructions
                        <FontAwesomeIcon
                            icon="fa-solid fa-plus"
                            className="text-warning transition-all hover:text-2xl cursor-pointer ml-10"
                            onClick={addHandlerInstruction}
                        />
                        <FontAwesomeIcon
                            icon="fa-solid fa-minus"
                            className="text-warning transition-all hover:text-2xl cursor-pointer ml-10"
                            onClick={delHandlerInstruction}
                        />
                    </label>
                    {
                        instructions.map(instruction => {
                            return <Instruction register={register} instruction={instruction} key={instruction}/>
                        })
                    }

                </div>

                <div>
                    <label className="label">URL of image</label>
                    <input type="input"
                           {...register("url")}
                           placeholder="Type here URL if needed.."
                           className="input input-bordered w-full hover:bg-slate-50"
                    />
                </div>

                <div>
                    <label className="label">Upload image</label>
                    <input type='file'
                           {...register("file", {})}
                           className="block w-full text-sm text-slate-500
                       file:mr-4 file:py-2 file:px-4
                       file:square file:border-0
                       file:text-sm file:font-semibold
                       file:bg-fuchsia-50 file:text-accent-700
                       hover:file:bg-base-300 mb-10"
                    />
                </div>

                <button type="submit" className="btn btn-neutral font-rufina-regular">Submit</button>
            </form>
        </>
    );
}

export default CreateRecipe;
