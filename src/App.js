import './App.css';
import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

// import Home from './layout/Home';
import MinhWorkSpace from './layout/MinhWorkSpace';
import About from './layout/HuyenWorkSpace/about'
import Features from './layout/HuyenWorkSpace/features'
import Pricing from './layout/HuyenWorkSpace/pricing'
import Contact from './layout/HuyenWorkSpace/contact'
import Minh2 from './layout/Minh2';
import GamePuzzle from './layout/GamePuzzle';
import Home from './layout/Home';

function App() {
  return (
    <>
      <Routes>
        <Route path='/about' element={<About/>}/>
        <Route path='/features' element={<Features/>}/>
        <Route path='/pricing' element={<Pricing/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/nghe-thuat-sang-tao' element={<MinhWorkSpace/>}/>
        <Route path='/minh2' element={<Minh2/>}/>
        <Route path='/gamepuzzle' element={<GamePuzzle/>}/>
        <Route path='/home' element={<Home/>}/>
      </Routes>
    </>
  );
}

export default App;
