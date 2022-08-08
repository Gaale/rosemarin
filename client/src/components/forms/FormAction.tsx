type Props = {
	handleSubmit: () => void;
	type: string;
	action: 'submit' | 'button' | 'reset';
	text: string;
	validateForm: () => boolean;
};
function FormAction({
	handleSubmit,
	type = 'Button',
	action = 'submit',
	text,
	validateForm,
}: Props) {
	return (
		<>
			{type === 'Button' ? (
				<button
					type={action}
					className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mt-10"
					disabled={validateForm()}
					// Remove Later
					onSubmit={handleSubmit}
				>
					{text}
				</button>
			) : (
				<></>
			)}
		</>
	);
}

export default FormAction;
