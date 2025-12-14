// import './App.css'
// import Home from './pages/Home'
// function App() {

//   return (
//     <>
//       <Home />
//     </>
//   )
// }

// export default App
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import './App.css';
import HeroAnimation from './HeroAnimation';

function App() {
  return (
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<Home />} />
    //     <Route path="/login" element={<Login />} />
    //     <Route path="/register" element={<Register />} />
    //   </Routes>
    // </BrowserRouter>
    <HeroAnimation />
  );
}

export default App;
