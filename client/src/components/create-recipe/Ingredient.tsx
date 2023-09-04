import React from 'react';

const Ingredient = ({ ingredient }: { ingredient: string }) => {
	//todo `${ingredient}`
	return (
		<div className="flex justify-between mb-3">
			<input
				id={'name-' + ingredient}
				type="text"
				name={'name-' + ingredient}
				placeholder="Type here ingredient.."
				className="input input-bordered w-1/3 hover:bg-slate-50"
			/>
			<input
				id={'quantity-' + ingredient}
				type="text"
				name={'quantity-' + ingredient}
				placeholder="quantity.."
				className="input input-bordered w-1/4 mr-3 mr-3 hover:bg-slate-50"
			/>
			<input
				id={'unit-' + ingredient}
				type="text"
				name={'unit-' + ingredient}
				placeholder="unit.."
				className="input input-bordered w-1/3 hover:bg-slate-50"
			/>
		</div>
	);
};

export default Ingredient;
