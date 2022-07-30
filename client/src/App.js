import React, {useEffect, useState} from 'react';
import './App.css';
import Navbar from "./components/Navbar";
import RecipesList from "./components/RecipesList";
import {getCategory, getRandomRecipe} from './Utils/apiService';
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import MyRecipesList from "./components/MyRecipesList";
import CreateRecipe from "./components/CreateRecipe";
import ShoppingList from "./components/ShoppingList";
import Menu from "./components/Menu";
import WeeklyMenu from "./components/WeeklyMenu";
import RecipeDetails from "./components/RecipeDetails";
import TopSection from "./components/TopSection";
import SearchForm from "./components/SearchForm";

function App() {
    const [recipes, setRecipes] = useState([]);
    const [categories, setCategories] = useState([]);


    useEffect(() => {
        // getRandomRecipe()
        //     .then(data => setRecipes(data))
        //     .catch(err => console.log.bind(err))
        setRecipes(getRandomRecipe());
    }, []);

    // useEffect(() => {
    //     getCategory()
    //         .then(cats => setCategories(cats.categories))
    //         .catch(err => console.log.bind(err))
    // }, []);



    return (
        <div className="font-oxy-regular">
            <BrowserRouter>
                <Navbar setRecipes={setRecipes} categories={categories}></Navbar>
                <TopSection></TopSection>
                <SearchForm setRecipes={setRecipes} categories={categories}></SearchForm>
                <Routes>
                    <Route exact path="/" element={<RecipesList recipes={recipes} setRecipes={setRecipes}/>}></Route>
                    <Route exact path="/my_recipes" element={<MyRecipesList />}></Route>
                    <Route exact path="/recipes/:id" element={<RecipeDetails recipes={recipes}/>}></Route>
                    <Route exact path="/create" element={<CreateRecipe />}></Route>
                    <Route exact path="/shopping_list" element={<ShoppingList />}></Route>
                    <Route exact path="/menu" element={<Menu />}></Route>
                    <Route exact path="/weekly_menu" element={<WeeklyMenu />}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}


export default App;
