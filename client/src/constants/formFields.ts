export type loginField = {
  labelText: string;
  labelFor: string;
  id: string;
  name: string;
  type: string;
  autoComplete: string;
  isRequired: boolean;
  placeholder: string;
};

const loginFields: loginField[] = [
  {
    labelText: 'Email address',
    labelFor: 'email',
    id: 'email',
    name: 'email',
    type: 'email',
    autoComplete: 'email',
    isRequired: true,
    placeholder: 'Email address',
  },
  {
    labelText: 'Password',
    labelFor: 'password',
    id: 'password',
    name: 'password',
    type: 'password',
    autoComplete: 'current-password',
    isRequired: true,
    placeholder: 'Password',
  },
];

const signupFields = [
  {
    labelText: 'Username',
    labelFor: 'name',
    id: 'name',
    name: 'name',
    type: 'text',
    autoComplete: 'username',
    isRequired: true,
    placeholder: 'Username',
  },
  {
    labelText: 'Email address',
    labelFor: 'email',
    id: 'email',
    name: 'email',
    type: 'email',
    autoComplete: 'email',
    isRequired: true,
    placeholder: 'Email address',
  },
  {
    labelText: 'Password',
    labelFor: 'password',
    id: 'password',
    name: 'password',
    type: 'password',
    autoComplete: 'current-password',
    isRequired: true,
    placeholder: 'Password',
  },
  {
    labelText: 'Confirm Password',
    labelFor: 'confirm-password',
    id: 'confirmPassword',
    name: 'confirm-password',
    type: 'password',
    autoComplete: 'confirm-password',
    isRequired: true,
    placeholder: 'Confirm Password',
  },
];

export { loginFields, signupFields };
