
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from "./pages/HomePage";
import SignIn from './pages/SigninPage';
import SignUp from './pages/SignUpPage';
import YourRecipe from './pages/YourRecipePage';

// import './App.css'; // Uncomment this if you have custom styles

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/yourrecipe" element={<YourRecipe />} />
      </Routes>
    </Router>
  );
}

export default App;
