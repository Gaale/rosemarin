import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import apiUserService from '../Utils/apiUserService';
import auth from '../Utils/auth.js';

const Logout = ({ setIsAuthenticated }) => {
  let navigate = useNavigate();
  const handleClick = () => {
    apiUserService
      .logout()
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    handleAuth();
  };

  const handleAuth = () => {
    setIsAuthenticated(false);
    auth.logout(() => navigate('/'));
  };

  return (
    <div className='hero min-h-screen bg-base-200'>
      <div className='hero-content text-center'>
        <div className='max-w-md'>
          <h2 className='text-2xl font-bold'>
            Are you sure you want to log out?
          </h2>
          <button
            className='group relative w-full  py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-500 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 mt-10 mr-10'
            onClick={() => handleClick()}
          >
            Yes
          </button>
          <button
            className='group relative w-full  py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 mt-10'
            onClick={() => navigate(-1)}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default Logout;
