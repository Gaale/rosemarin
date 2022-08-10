import React, { useEffect, useState, useContext } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import RecipesList from './components/recipe-lists/RecipesList.tsx';
import { getCategory, getRandomRecipe } from './Utils/apiService';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MyRecipesList from './components/recipe-lists/MyRecipesList';
import CreateRecipe from './components/create-recipe/CreateRecipe';
import ShoppingList from './components/ShoppingList';
import Menu from './components/Menu';
import WeeklyMenu from './components/WeeklyMenu';
import RecipeDetails from './components/recipe-lists/RecipeDetails';
import { getMyRecipes } from './Utils/apiDBService';
import { getMyShoppingList } from './Utils/apiDBServiceShoppingList';
import LoginPage from './components/auth/Login';
import SignupPage from './components/auth/Signup';
import auth from './Utils/Auth';
import Logout from './components/auth/Logout';

function App() {
	const [recipes, setRecipes] = useState([]);

	const [myRecipes, setMyRecipes] = useState([]);
	const [ids, setIds] = useState([]);
	const [items, setItems] = useState([]);
	const initialState = auth.isAuthenticated();
	const [isAuthenticated, setIsAuthenticated] = useState(initialState);

	useEffect(() => {
		if (isAuthenticated) {
			getMyShoppingList()
				// .then(recipes => console.log(recipes))
				.then((itemsSL) => setItems(itemsSL))
				.catch((err) => console.log.bind(err));
		}
	}, [isAuthenticated]);

	useEffect(() => {
		if (isAuthenticated) {
			try {
				getRandomRecipe()
					// .then(recipes => console.log(recipes))
					// .then((data) => setRecipes(data.results)) //This is the one that works for the request to the API
					.then((data) => {
						// console.log(data);
						console.log(data);
						setRecipes(data);
					}) //This works for the API service that caches the data
					.catch((err) => {
						console.log(err);
						console.log('MIERDA');
					});
			} catch (error) {}
			// setRecipes(getRandomRecipe());
		}
	}, [isAuthenticated]);

	useEffect(() => {
		if (isAuthenticated) {
			getMyRecipes()
				.then((recipes) => {
					console.log(recipes);
					return recipes.map((el) =>
						setIds((prev) => {
							let id = el.id;
							let id_tasty = el.id_tasty;
							const filtered = prev.filter((e) => e.id_tasty !== el.id_tasty);
							return [...filtered, { id, id_tasty }];
						})
					);
				})
				.catch((err) => console.log.bind(err));
		}
	}, [isAuthenticated]);

	useEffect(() => {
		if (isAuthenticated) {
			getMyRecipes()
				// .then(recipes => console.log(recipes))
				.then((recipes) => {
					// console.log(recipes);
					setMyRecipes(recipes);
				})
				.catch((err) => console.log.bind(err));
		}
	}, [ids]);

	return (
		<div className="font-oxy-regular">
			<BrowserRouter>
				<Navbar isAuthenticated={isAuthenticated}></Navbar>
				<Routes>
					<Route
						exact
						path="/"
						element={<LoginPage setIsAuthenticated={setIsAuthenticated} />}
					></Route>
					<Route
						exact
						path="/signup"
						element={<SignupPage setIsAuthenticated={setIsAuthenticated} />}
					></Route>
					<Route
						path="/logout"
						element={<Logout setIsAuthenticated={setIsAuthenticated} />}
					/>

					{isAuthenticated && (
						<>
							<Route
								exact
								path="/home"
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
								exact
								path="/my_recipes"
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
								exact
								path="/recipes/:id"
								element={
									<RecipeDetails
										recipes={recipes}
										myRecipes={myRecipes}
										setItems={setItems}
										setIds={setIds}
										ids={ids}
									/>
								}
							></Route>
						</>
					)}

					<Route exact path="/create" element={<CreateRecipe />}></Route>
					<Route exact path="/menu" element={<Menu />}></Route>
					<Route exact path="/weekly_menu" element={<WeeklyMenu />}></Route>
				</Routes>
			</BrowserRouter>
			<ShoppingList items={items} setItems={setItems} isAuthenticated={isAuthenticated} />
		</div>
	);
}

export default App;
