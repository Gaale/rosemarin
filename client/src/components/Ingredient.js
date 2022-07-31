import React from 'react';

const Ingredient = ({register, ingredient}) => {
    return (
        <div className="flex justify-between mb-3">
            <input type="text"
                   {...register("name" + ingredient, {
                       required: {value: true, message: "This is required."}
                   })}
                   placeholder="Type here ingredient.."
                   className="input input-bordered w-1/3 hover:bg-slate-50"
            />
            <input type="text"
                   {...register("quantity" + ingredient, {})}
                   placeholder="quantity.."
                   className="input input-bordered w-1/4 mr-3 mr-3 hover:bg-slate-50"
            />
            <input type="text"
                   {...register("unit" + ingredient, {})}
                   placeholder="unit.."
                   className="input input-bordered w-1/3 hover:bg-slate-50"
            />
        </div>
    );
};

export default Ingredient;