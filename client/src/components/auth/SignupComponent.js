import { useState } from 'react';
import { signupFields } from '../../constants/formFields';
import FormAction from '../forms/FormAction';
import Input from './Input';
import apiUserService from '../../Utils/apiUserService';
import auth from '../../Utils/Auth';
import { useNavigate } from 'react-router-dom';

const fields = signupFields;
let fieldsState = {};

fields.forEach((field) => (fieldsState[field.id] = ''));

function SignupComponent(props) {
  const [signupState, setSignupState] = useState(fieldsState);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) =>
    setSignupState({ ...signupState, [e.target.id]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    createAccount();
  };

  //handle Signup API Integration here
  const createAccount = () => {
    apiUserService
      .register(signupState)
      .then((res) => {
        if (!res) {
          setErrorMessage('Account already exists. Please try again.');
        } else {
          // This sets isAuthenticated = true and redirects to profile
          props.setIsAuthenticated(true);
          auth.login(() => navigate('../home', { replace: true }));
        }
      })
      .catch((err) => console.log(err));
  };

  const validateForm = () => {
    return (
      !signupState.email ||
      !signupState.password ||
      !signupState.name ||
      signupState.password !== signupState.confirmPassword
    );
  };

  return (
    <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
      <div className=''>
        {fields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleChange}
            value={signupState[field.id]}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
          />
        ))}
        <FormAction
          handleSubmit={handleSubmit}
          text='Signup'
          validateForm={validateForm}
        />
      </div>
      <div className='alert-error'>{errorMessage}</div>
    </form>
  );
}

export default SignupComponent;
