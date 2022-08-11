import React, { FormEvent, useRef, useState } from 'react';
import TopSection from '../layout/TopSection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Instruction from './Instruction';
import Ingredient from './Ingredient';
import { postRecipe } from '../../Utils/apiDBService';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

function CreateRecipe() {
	const [ingredients, setIngredients] = useState(['1-ingredient']);
	const [instructions, setInstructions] = useState(['1-instruction']);

	const form = useRef(null);

	// const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
	const handleSubmit = (e: React.SyntheticEvent) => {
		e.preventDefault();

		let subInstructions = [];
		let tmpIngredients = [];
		const formData = new FormData(form.current!);

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

		tmpIngredients = tmpIngredients.reduce((o, i) => {
			if (!o.find((v: { name: string }) => v.name == i.name)) {
				o.push(i);
			}
			return o;
		}, []);

		tmpIngredients.shift();

		const target = e.target as typeof e.target & {
			title: { value: string };
			description: { value: string };
			url: { value: string };
			img_alt_text: { value: string };
		};

		const newRecipe = {
			//title: e.currentTarget.title.valueOf(),
			title: target.title.value,
			description: target.description.value,
			img_url: target.url.value || null,
			// files: e.target[7].files[0] || null,
			img_alt_text: target.title.value,
			ingredients: tmpIngredients,
			instructions: subInstructions,
		};
		console.log(newRecipe);
		postRecipe(newRecipe)
			.then((res) => console.log(res))
			.catch((error) => console.log(error));

		target.title.value = '';
		target.description.value = '';
		target.url.value = '';
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
				encType="multipart/form-data"
				onSubmit={handleSubmit}
				className="w-2/3 m-auto form-control prose lg:prose-xl mb-40"
			>
				<h2 className="m-auto font-rufina-bold">Create your own recipe</h2>
				<div>
					<label className="label">Title</label>
					<input
						id="title"
						type="text"
						name="title"
						placeholder="Type here title of your recipe..."
						className="input input-bordered w-full hover:bg-slate-50"
					/>
				</div>

				<div>
					<label className="label">Description</label>
					<textarea
						id="description"
						name="description"
						placeholder="Type here description of your recipe..."
						className="textarea input-bordered w-full hover:bg-slate-50 cursor-pointer"
					/>
				</div>

				<div>
					<label className="label justify-start mr-10">
						Ingredients
						<FontAwesomeIcon
							id="addIngredient"
							icon={'fa-solid fa-plus' as IconProp}
							className="text-warning transition-all hover:text-2xl ml-10"
							onClick={addHandlerIngredient}
						/>
						<FontAwesomeIcon
							id="removeIngredient"
							icon={'fa-solid fa-minus' as IconProp}
							className="text-warning transition-all hover:text-2xl cursor-pointer ml-10"
							onClick={delHandlerIngredient}
						/>
					</label>
					{ingredients.map((ingredient) => {
						return <Ingredient ingredient={ingredient} key={ingredient} />;
					})}
				</div>

				<div>
					<label className="label justify-start mr-10">
						Instructions
						<FontAwesomeIcon
							id="addInstruction"
							icon={'fa-solid fa-plus' as IconProp}
							className="text-warning transition-all hover:text-2xl cursor-pointer ml-10"
							onClick={addHandlerInstruction}
						/>
						<FontAwesomeIcon
							id="removeInstruction"
							icon={'fa-solid fa-minus' as IconProp}
							className="text-warning transition-all hover:text-2xl cursor-pointer ml-10"
							onClick={delHandlerInstruction}
						/>
					</label>
					{instructions.map((instruction) => {
						return <Instruction instruction={instruction} key={instruction} />;
					})}
				</div>

				<div>
					<label className="label">URL of image</label>
					<input
						id="url"
						type="input"
						name="url"
						placeholder="Type here URL if needed.."
						className="input input-bordered w-full hover:bg-slate-50"
					/>
				</div>

				<div>
					<label className="label">Upload image</label>
					<input
						type="file"
						name="file"
						className="block w-full text-sm text-slate-500
                       file:mr-4 file:py-2 file:px-4
                       file:square file:border-0
                       file:text-sm file:font-semibold
                       file:bg-fuchsia-50 file:text-accent-700
                       hover:file:bg-base-300 mb-10"
					/>
				</div>

				<button type="submit" className="btn btn-neutral font-rufina-regular">
					Submit
				</button>
			</form>
		</>
	);
}

export default CreateRecipe;
