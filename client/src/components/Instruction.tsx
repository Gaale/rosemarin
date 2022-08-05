import * as React from 'react';

const Instruction = ({instruction}) => {
    return (
        <textarea
            name={"text-"+instruction}
            placeholder="Type here instruction.."
            className="textarea input-bordered w-full hover:bg-slate-50"
        />
    );
};

export default Instruction;