import React, { Dispatch, SetStateAction } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import apiUserService from '../../Utils/apiUserService';
import auth from '../../Utils/Auth';

type Prop = {
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
};

const Logout = ({ setIsAuthenticated }: Prop) => {
  let navigate = useNavigate();

  const handleClick = () => {
    console.log('Handle click called');
    apiUserService
      .logout()
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    handleAuth();
  };

  const handleAuth = () => {
    setIsAuthenticated(false);
    auth.logout(() => navigate('../', { replace: true }));
  };

  return (
    <div className='hero min-h-screen bg-base-200'>
      <div className='hero-content text-center'>
        <div className='max-w-md'>
          <h2 className='text-2xl font-bold'>
            Are you sure you want to log out?
          </h2>
          <Link to='/'>
            <button
              className='group relative w-full  py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-500 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 mt-10 w-[150px] mr-10'
              onClick={handleClick}
            >
              Yes
            </button>
          </Link>
          <button className='group relative w-full  py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 mt-10 w-[150px]'>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default Logout;
