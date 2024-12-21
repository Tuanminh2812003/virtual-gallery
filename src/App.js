import './App.css';
import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from './layout/MainLayout/Home';
import LayoutDefault from './layout/MainLayout/LayoutDefault';

// import Home from './layout/Home';
import MinhWorkSpace from './layout/MinhWorkSpace';
import HuyenWorkSpace from './layout/HuyenWorkSpace';
import About from './layout/HuyenWorkSpace/about'
import Features from './layout/HuyenWorkSpace/features'
import Pricing from './layout/HuyenWorkSpace/pricing'
import Contact from './layout/HuyenWorkSpace/contact'
import HieuWorkSpace from './layout/HieuWorkSpace';
import Minh2 from './layout/Minh2';
import GamePuzzle from './layout/GamePuzzle';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<LayoutDefault/>}>
          <Route path='/' element={<Home/>}/>
        </Route>

        <Route path='/about' element={<About/>}/>
        <Route path='/features' element={<Features/>}/>
        <Route path='/pricing' element={<Pricing/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/hieu' element={<HieuWorkSpace/>}/>
        <Route path='/minh' element={<MinhWorkSpace/>}/>
        <Route path='/minh2' element={<Minh2/>}/>
        <Route path='/gamepuzzle' element={<GamePuzzle/>}/>
      </Routes>
    </>
  );
}

export default App;
