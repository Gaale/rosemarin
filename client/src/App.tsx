import * as React from 'react';
import { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import RecipesList from './components/RecipesList';
import { getRandomRecipe } from './Utils/apiService';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MyRecipesList from './components/MyRecipesList';
import CreateRecipe from './components/CreateRecipe';
import ShoppingList from './components/ShoppingList';
import Menu from './components/Menu';
import WeeklyMenu from './components/WeeklyMenu';
import RecipeDetails from './components/RecipeDetails';
import { getMyRecipes } from './Utils/apiDBService';
import { getMyShoppingList } from './Utils/apiDBServiceShoppingList';
import LoginPage from './components/Login';
import SignupPage from './components/Signup';
import Logout from './components/Logout';
import { Recipe, MyRecipe, Ids } from './Types';
import auth from './Utils/auth.js';
import apiUserService from './Utils/apiUserService';
const BASE_URL = 'http://localhost:3001';

function App() {
  const [recipes, setRecipes] = useState([] as Recipe[] | []);
  const [myRecipes, setMyRecipes] = useState([] as MyRecipe[] | []);
  const [ids, setIds] = useState([] as Ids[] | []);
  const [items, setItems] = useState([]);
  const initialState = auth.isAuthenticated();
  const [isAuthenticated, setIsAuthenticated] = useState(initialState);

  useEffect(() => {
    // try {

    //   // const data = async function () {
    //   //   let res = await fetch(`${BASE_URL}/login`);
    //   //   res = await res.json();
    //   //   console.log(res);
    //   //   return res;
    //   // };
    //   // console.log('data', data());
    // } catch (error) {
    //   console.log(error);
    // }
    try {
      apiUserService
        .profile()
        .then((data) => setIsAuthenticated(data.isAuthenticated));
    } catch (error) {
      console.log(error);
    }
  }, []);
  

  useEffect(() => {
    getMyShoppingList()
      // .then(recipes => console.log(recipes))
      .then((itemsSL) => setItems(itemsSL))
      .catch((err) => console.log.bind(err));
  }, []);

  useEffect(() => {
    // getRandomRecipe()
    //   // .then(recipes => console.log(recipes))
    //   .then((data) => setRecipes(data.results))
    //   .catch((err) => console.log.bind(err));
    setRecipes(getRandomRecipe());
  }, []);

  useEffect(() => {
    getMyRecipes()
      .then((recipes) =>
        recipes.map((el) =>
          setIds((prev) => {
            let id = el.id;
            let id_tasty = el.id_tasty;
            const filtered = prev.filter(
              (e: MyRecipe) => e.id_tasty !== el.id_tasty
            );
            return [...filtered, { id, id_tasty }];
          })
        )
      )
      .catch((err) => console.log.bind(err));
  }, []);

  useEffect(() => {
    getMyRecipes()
      // .then(recipes => console.log(recipes))
      .then((recipes) => setMyRecipes(recipes))
      .catch((err) => console.log.bind(err));
  }, [ids]);

  return (
    <div className='font-oxy-regular'>
      <BrowserRouter>
        <Navbar isAuthenticated={isAuthenticated}></Navbar>
        <Routes>
          <Route
            path='/'
            element={<LoginPage setIsAuthenticated={setIsAuthenticated} />}
          ></Route>
          <Route
            path='/signup'
            element={<SignupPage setIsAuthenticated={setIsAuthenticated} />}
          ></Route>
          <Route
            path='/logout'
            element={<Logout setIsAuthenticated={setIsAuthenticated} />}
          />

          <Route
            path='/home'
            element={
              <RecipesList
                setRecipes={setRecipes}
                recipes={recipes}
                setIds={setIds}
                ids={ids}
              />
            }
          ></Route>
          <Route
            path='/my_recipes'
            element={
              <MyRecipesList
                myRecipes={myRecipes}
                setMyRecipes={setMyRecipes}
                setIds={setIds}
                ids={ids}
                setRecipes={setRecipes}
              />
            }
          ></Route>
          <Route
            path='/recipes/:id'
            element={
              <RecipeDetails
                recipes={recipes}
                myRecipes={myRecipes}
                setItems={setItems}
              />
            }
          ></Route>
          <Route path='/create' element={<CreateRecipe />}></Route>
          <Route path='/menu' element={<Menu />}></Route>
          <Route path='/weekly_menu' element={<WeeklyMenu />}></Route>
        </Routes>
      </BrowserRouter>
      <ShoppingList items={items} setItems={setItems} />
    </div>
  );
}

export default App;
