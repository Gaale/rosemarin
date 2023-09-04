import { render, screen } from '@testing-library/react'; // (or /dom, /vue, ...)
import userEvent from '@testing-library/user-event';
import Input from '../Input';

const handleChange = jest.fn();
const value = '';
const labelText = 'Email address';
const labelFor = 'email';
const id = 'email';
const name = 'email';
const type = 'email';
const placeholder = 'email';
const isRequired = true;

test('should change its value when its written on', () => {
	let inputValue = '';
	render(
		<Input
			handleChange={(e) => {
				handleChange();
				inputValue += e.target.value;
			}}
			value={value}
			labelText={labelText}
			labelFor={labelFor}
			id={id}
			name={name}
			type={type}
			isRequired={isRequired}
			placeholder={placeholder}
		/>
	);

	const emailInput = 'email@email.com';
	const input = screen.getByPlaceholderText(/email/);
	userEvent.type(input, emailInput);
	// console.log(input);
	expect(handleChange).toBeCalledTimes(emailInput.length);
	expect(inputValue).toEqual(emailInput);
});
