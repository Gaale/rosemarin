import React, {useEffect, useState, useContext} from 'react';
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
import {getMyRecipes} from "./Utils/apiDBService";
import {getMyShoppingList} from "./Utils/apiDBServiceShoppingList";
import LoginPage from "./components/Login";
import SignupPage from "./components/Signup";
import auth from "./Utils/Auth";
import Logout from "./components/Logout";

function App() {
    const [recipes, setRecipes] = useState([]);
    const [myRecipes, setMyRecipes] = useState([]);
    const [ids, setIds] = useState([])
    const [items, setItems] = useState([]);
    const initialState = auth.isAuthenticated();
    const [isAuthenticated, setIsAuthenticated] = useState(initialState);


    useEffect(() => {
            getMyShoppingList()
                // .then(recipes => console.log(recipes))
                .then(itemsSL => setItems(itemsSL))
                .catch(err => console.log.bind(err))
    }, [])

    useEffect(() => {
        getRandomRecipe()
            // .then(recipes => console.log(recipes))
            .then(data => setRecipes(data.results))
            .catch(err => console.log.bind(err))
        // setRecipes(getRandomRecipe());
    }, []);


    useEffect(() => {
            getMyRecipes()
                .then(recipes => recipes.map(el => setIds(prev => {
                    let id = el.id;
                    let id_tasty = el.id_tasty;
                    const filtered = prev.filter(e => e.id_tasty !== el.id_tasty);
                    return [...filtered, {id, id_tasty}]
                })))
                .catch(err => console.log.bind(err))
    }, []);

    useEffect(() => {
            getMyRecipes()
                // .then(recipes => console.log(recipes))
                .then(recipes => setMyRecipes(recipes))
                .catch(err => console.log.bind(err))
    }, [ids])


    return (
        <div className="font-oxy-regular">
            <BrowserRouter>
                <Navbar isAuthenticated={isAuthenticated}></Navbar>
                <Routes>
                    <Route exact path="/" element={<LoginPage setIsAuthenticated={setIsAuthenticated}/>}></Route>
                    <Route exact path="/signup" element={<SignupPage setIsAuthenticated={setIsAuthenticated}/>}></Route>
                    <Route
                        path="/logout"
                        element={<Logout setIsAuthenticated={setIsAuthenticated} />}
                    />

                    <Route exact path="/home"
                           element={<RecipesList setRecipes={setRecipes} recipes={recipes} setIds={setIds}
                                                 ids={ids}/>}></Route>
                    <Route exact path="/my_recipes"
                           element={<MyRecipesList myRecipes={myRecipes} setMyRecipes={setMyRecipes} setIds={setIds}
                                                   ids={ids} setRecipes={setRecipes}/>}></Route>
                    <Route exact path="/recipes/:id" element={<RecipeDetails recipes={recipes} myRecipes={myRecipes} setItems={setItems} setIds={setIds} ids={ids}/>}></Route>
                    <Route exact path="/create" element={<CreateRecipe/>}></Route>
                    <Route exact path="/menu" element={<Menu/>}></Route>
                    <Route exact path="/weekly_menu" element={<WeeklyMenu/>}></Route>
                </Routes>
            </BrowserRouter>
            <ShoppingList items={items} setItems={setItems}/>
        </div>
    );
}


export default App;
