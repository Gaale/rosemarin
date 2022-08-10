import Header from '../layout/Header';
import SignupComponent from './SignupComponent';
import { Dispatch, SetStateAction } from 'react';

type Prop = {
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
};

function SignupPage({ setIsAuthenticated }: Prop) {
  return (
    <div className='min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8'>
        <Header
          heading='Signup to create an account'
          paragraph='Already have an account? '
          linkName='Login'
          linkUrl='/'
        />
        <SignupComponent setIsAuthenticated={setIsAuthenticated} />
      </div>
    </div>
  );
}

export default SignupPage;
