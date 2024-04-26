import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './NavBar.jsx';
import Recipe from './Recipe.jsx';
import Profile from './Profile.jsx';
import RecipeDetails from './RecipeDetails.jsx';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <NavBar/>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/recipe" element={<Recipe />} />
        <Route path ="/profile" element={<Profile />} />
        <Route path="/recipe-details" element={<RecipeDetails />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
