import React from 'react';

const TopSection = () => {
	return (
		<div className="h-[400px] flex justify-between items-center">
			<div className="flex justify-center items-center w-2/3 rotate-[350deg]">
				<h1 className="font-alex-brush text-5xl ">
					Cooking is a love
					<br />
					you can taste...
				</h1>
			</div>
			<div className="bg-top-img w-1/2 h-full bg-auto bg-no-repeat bg-center bg-cover"></div>
		</div>
	);
};

export default TopSection;
