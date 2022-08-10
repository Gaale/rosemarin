import React from 'react';

const Instruction = ({ instruction }: { instruction: string }) => {
	return (
		<textarea
			name={'text-' + instruction}
			placeholder="Type here instruction.."
			className="textarea input-bordered w-full hover:bg-slate-50"
		/>
	);
};

export default Instruction;
