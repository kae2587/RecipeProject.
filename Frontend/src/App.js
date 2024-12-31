
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from "./pages/HomePage";
import SignIn from './pages/SigninPage';
import SignUp from './pages/SignUpPage';
import YourRecipe from './pages/YourRecipePage';
import CreateNewRecipe from './pages/CreateNewRecipe';
import CertainRecipe from './pages/CertainRecipe';
import EditRecipe from './pages/EditRecipe';
import MealGenerator from './pages/MealGenerator';
import GenerateSevenDay from './pages/GenerateSevenDay';


// import './App.css'; // Uncomment this if you have custom styles

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/yourrecipe" element={<YourRecipe />} />
        <Route path="/createnewrecipe" element={<CreateNewRecipe />} />
        <Route path="/certainrecipe" element={<CertainRecipe />} />
        <Route path="/editrecipe" element={<EditRecipe />} />
        <Route path="/mealgenerator" element={<MealGenerator />} />
        <Route path="/generatesevenday" element={<GenerateSevenDay />} />
      </Routes>
    </Router>
  );
}

export default App;
