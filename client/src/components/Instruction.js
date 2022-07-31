import React from 'react';

const Instruction = ({register, instruction}) => {
    return (
        <textarea
            {...register(instruction, {required: {value: true, message: "This is required."}})}
            placeholder="Type here instruction.."
            className="textarea input-bordered w-full hover:bg-slate-50"
        />
    );
};

export default Instruction;