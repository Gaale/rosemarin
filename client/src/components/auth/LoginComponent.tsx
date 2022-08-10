import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { loginFields } from '../../constants/formFields';
import FormAction from '../forms/FormAction';
import FormExtra from '../forms/FormExtra';
import Input from './Input';
import { useNavigate } from 'react-router-dom';
import apiUserService from '../../Utils/apiUserService';
import auth from '../../Utils/Auth';

type Props = {
	setIsAuthenticated: Dispatch<SetStateAction<Boolean>>;
};

function LoginComponent({ setIsAuthenticated }: Props) {
	const [loginState, setLoginState] = useState({ email: '', password: '' });
	const [errorMessage, setErrorMessage] = useState('');

	const navigate = useNavigate();

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setLoginState({ ...loginState, [e.target.id]: e.target.value });
	};

	// const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
	// 	event.preventDefault();
	// 	authenticateUser();
	// };

	//Handle Login API Integration here
	const authenticateUser = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		apiUserService
			.login(loginState)
			.then((res) => {
				console.log(res);
				if (!res) {
					setErrorMessage('Incorrect login information.');
				} else {
					// This sets isAuthenticated = true and redirects to profile
					setIsAuthenticated(true);
					auth.login(() => navigate('../home', { replace: true }));
				}
			})
			.catch((err) => console.log(err));
	};

	const validateForm = () => {
		return !loginState.email || !loginState.password;
	};

	return (
		<form className="mt-8 space-y-6" onSubmit={authenticateUser}>
			<div className="-space-y-px">
				<Input
					key={loginFields[0].id}
					handleChange={handleChange}
					value={loginState.email}
					labelText={loginFields[0].labelText}
					labelFor={loginFields[0].labelFor}
					id={loginFields[0].id}
					name={loginFields[0].name}
					type={loginFields[0].type}
					isRequired={loginFields[0].isRequired}
					placeholder={loginFields[0].placeholder}
				/>
				<Input
					key={loginFields[1].id}
					handleChange={handleChange}
					value={loginState.password}
					labelText={loginFields[1].labelText}
					labelFor={loginFields[1].labelFor}
					id={loginFields[1].id}
					name={loginFields[1].name}
					type={loginFields[1].type}
					isRequired={loginFields[1].isRequired}
					placeholder={loginFields[1].placeholder}
				/>
			</div>

			<FormExtra />
			<FormAction text="Login" validateForm={validateForm} />
			<div className="alert-error">{errorMessage}</div>
		</form>
	);
}

export default LoginComponent;
