import React, { useEffect, useState } from 'react';
import './App.css';
import Recipe from './components/Recipe';

function App() {

const APP_ID = "6049dc74";
const API_KEY = "b9d1ec088c44040b805f838af53c7376";

// const exampleReq = `https://api.edamam.com/search?q=chicken&app_id=${APP_ID}&app_key=${API_KEY}`;

const [recipes, setRecipes] = useState([]);
const [search, setSearch] = useState("");
const [query, setQuery] = useState('chicken');

useEffect(() => {
  getRecipes();
}, [query])

 const getRecipes = async () => {
   const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${API_KEY}`);
   const data = await response.json();
   setRecipes(data.hits);
   console.log(data.hits);
 }

const updateSearch = (e) => {
  setSearch(e.target.value);
  console.log(search);
}

const getSearch = e => {
  setQuery(search);
  setSearch('');
  e.preventDefault();
}
  return (
    <div className="App">
      <form className="search-form" onSubmit={getSearch}>
        <input type="text" className="search-bar" value={search} onChange={updateSearch} placeholder="Type to search........."/>
        <button type="submit" className="search-button">
          Search
          </button> 
      </form>

      <div className="recipes">
        { recipes.map(single => (
          <Recipe 
                  key={single.recipe.label}
                  title={single.recipe.label}
                  calories={single.recipe.calories}
                  image={single.recipe.image}
                  ingredients={single.recipe.ingredients}
            />
        )) }

      </div>
      
    </div> 

 
  );
}

export default App;
