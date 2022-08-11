import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import LoginComponent from '../LoginComponent';

test('it should render all its elements correctly', () => {
	const setIsAuthenticated = jest.fn();
	render(<LoginComponent setIsAuthenticated={setIsAuthenticated} />, { wrapper: MemoryRouter });

	const emailInput = screen.getByPlaceholderText(/Email address/);
	expect(emailInput).toBeInTheDocument();
	const passwordInput = screen.getByPlaceholderText(/Password/);
	expect(passwordInput).toBeInTheDocument();
	const buttonSubmit = screen.getByRole('button');
	expect(buttonSubmit).toBeInTheDocument();
});

test('button should be disabled if parameters invalid and enabled if they are', () => {
	const setIsAuthenticated = jest.fn();
	render(<LoginComponent setIsAuthenticated={setIsAuthenticated} />, { wrapper: MemoryRouter });

	const emailInput = screen.getByPlaceholderText(/Email address/);
	const passwordInput = screen.getByPlaceholderText(/Password/);

	const buttonSubmit = screen.getByRole('button');
	expect(buttonSubmit).toBeDisabled();

	userEvent.type(emailInput, 'email@email.com');

	expect(buttonSubmit).toBeDisabled();

	userEvent.type(passwordInput, '123');

	expect(buttonSubmit).toBeEnabled();
});

test('form on submit should call function with parameters', () => {
	const setIsAuthenticated = jest.fn();

	render(<LoginComponent setIsAuthenticated={setIsAuthenticated} />, {
		wrapper: MemoryRouter,
	});

	const emailInput = screen.getByPlaceholderText(/Email address/);
	const passwordInput = screen.getByPlaceholderText(/Password/);
	const buttonSubmit = screen.getByRole('button');

	const authenticateSpy = jest.spyOn(console, 'log');

	userEvent.type(emailInput, 'email@email.com');
	userEvent.type(passwordInput, '123');
	userEvent.click(buttonSubmit);
	// fireEvent.click(buttonSubmit);

	expect(authenticateSpy).toBeCalledWith({ email: 'email@email.com', password: '123' });
});
