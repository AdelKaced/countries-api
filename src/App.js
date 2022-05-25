import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import About from './pages/About';
import Home from './pages/Home';
import Logo from './components/Logo';
import Quizz from './pages/Quizz';
import Blog from './pages/Blog';


const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Logo /> 
      <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/quizz" element={<Quizz />} />
          <Route path="*" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
