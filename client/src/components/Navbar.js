import React from 'react';
import { slide as Menu } from 'react-burger-menu'
import { Link } from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUser } from "@fortawesome/fontawesome-free-regular";
// import {faUserCheck} from "@fortawesome/fontawesome-free-solid";

library.add(faUser);

const Navbar = ({ setRecipes, categories }) => {

    return (
        <div className="relative">
            {/*<Menu width={ '250px' } >*/}
            {/*    <Link className="menu-item" to="/">Home</Link>*/}
            {/*    <Link className="menu-item" to="/my_recipes">My Recipes</Link>*/}
            {/*    <Link className="menu-item" to="/create">Create Recipe</Link>*/}
            {/*    <Link className="menu-item" to="/shopping_list">Shopping List</Link>*/}
            {/*    <Link className="menu-item" to="/menu">Menu</Link>*/}
            {/*    <Link className="menu-item" to="/weekly_menu">Weekly Menu</Link>*/}
            {/*</Menu>*/}
            <div className="flex justify-center items-center h-20 bg-base-100 shadow-md fixed top-0 left-0 right-0 z-10">
                <div className="">
                    <Link className="menu-item cursor-pointer " to="/my_recipes" >My Recipes</Link>
                    <Link className="menu-item ml-10 cursor-pointer" to="/create">Create Recipe</Link>
                </div>
                <div className="">
                    <Link to="/" className="btn btn-ghost normal-case text-3xl font-PoiretOne mr-4 ml-4">ROSEMARIN</Link>
                </div>
                <div className="justify-start">
                    <Link className="menu-item mr-10 cursor-pointer" to="/shopping_list">Shopping List</Link>
                    <Link className="menu-item cursor-pointer" to="/menu">Menu</Link>
                </div>
                <div className="absolute right-20">
                    <FontAwesomeIcon icon={ faUser } className="text-2xl cursor-pointer mr-3" />
                    {/*<FontAwesomeIcon icon={ faUserCheck } className="text-2xl cursor-pointer mr-3" />*/}
                    Login
                </div>

            </div>
        </div>
    );
};

export default Navbar;