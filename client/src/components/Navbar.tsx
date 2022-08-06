import * as React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/fontawesome-free-regular';
import { faUserCheck } from '@fortawesome/fontawesome-free-solid';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

const Navbar = ({ isAuthenticated }) => {
  return (
    <div className='relative '>
      <div className='flex justify-center items-center h-20 bg-base-100 shadow-md fixed top-0 left-0 right-0 z-10'>
        <div className=''>
          {isAuthenticated ? (
              <Link className='menu-item cursor-pointer ' to='/my_recipes'>
              My Recipes
            </Link>
          ) : (
            <Link className='menu-item cursor-pointer ' to='/'>
            My Recipes
          </Link>
              )}
          {isAuthenticated ? (
              <Link className='menu-item ml-10 cursor-pointer' to='/create'>
              Create Recipe
            </Link>
          ) : (
            <Link className='menu-item ml-10 cursor-pointer' to='/'>
            Create Recipe
          </Link>
          )}
        </div>
        <div className=''>
          
              <Link
              to='/home'
              className='btn btn-ghost normal-case text-3xl font-PoiretOne mr-4 ml-4'
              >
              ROSEMARY
            </Link>
        </div>
        <div className='justify-start'>
          {isAuthenticated ? (
            <label
              htmlFor='my-modal'
              className='menu-item mr-10 cursor-pointer modal-button'
            >
              Shopping List
            </label>
          ) : (
            <Link className='menu-item mr-10 cursor-pointer modal-button' to='/'>
              Shopping List
            </Link>
          )}
          {isAuthenticated ? (
            <Link className='menu-item cursor-pointer' to='/menu'>
              Menu
            </Link>
          ) : (
            <Link className='menu-item cursor-pointer' to='/'>
              Menu
            </Link>
          )}
        </div>
        <div className='ml-10'>
          {isAuthenticated ? (
            <Link className='menu-item cursor-pointer' to='/logout'>
              <FontAwesomeIcon
                icon={faUserCheck as IconProp}
                className='text-2xl cursor-pointer mr-3'
              />
              Logout
            </Link>
          ) : (
            <Link className='menu-item cursor-pointer' to='/'>
              <FontAwesomeIcon
                icon={faUser as IconProp}
                className='text-2xl cursor-pointer mr-3'
              />
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
