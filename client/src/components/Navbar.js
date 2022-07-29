import React from 'react';
import { slide as Menu } from 'react-burger-menu'
import { Link } from "react-router-dom";
import SearchForm from "./SearchForm";

const Navbar = ({ setRecipes, categories }) => {

    return (
        <div>
            <Menu width={ '250px' } >
                <Link className="menu-item" to="/">Home</Link>
                <Link className="menu-item" to="/my_recipes">My Recipes</Link>
                <Link className="menu-item" to="/create">Create Recipe</Link>
                <Link className="menu-item" to="/shopping_list">Shopping List</Link>
                <Link className="menu-item" to="/menu">Menu</Link>
                <Link className="menu-item" to="/weekly_menu">Weekly Menu</Link>
            </Menu>
            <div className="navbar h-20 bg-base-100 shadow-md fixed top-0 left-0 right-0 z-10">
                <div className="navbar-start"></div>
                <div className="navbar-center">
                    <Link to="/" className="btn btn-ghost normal-case text-3xl font-PoiretOne">Rosemarin.</Link>
                </div>
                <div className="navbar-end">
                    <SearchForm setRecipes={setRecipes} categories={categories}></SearchForm>
                    <button className="btn btn-ghost btn-circle">
                        <div className="indicator">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24"
                                 stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
                            </svg>
                            <span className="badge badge-xs badge-primary indicator-item"></span>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Navbar;