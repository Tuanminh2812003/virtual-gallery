import './App.css';
import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from './layout/Home';
import MinhWorkSpace from './layout/MinhWorkSpace';
import HuyenWorkSpace from './layout/HuyenWorkSpace';
import HieuWorkSpace from './layout/HieuWorkSpace';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/huyen' element={<HuyenWorkSpace/>}/>
        <Route path='/hieu' element={<HieuWorkSpace/>}/>
        <Route path='/minh' element={<MinhWorkSpace/>}/>
      </Routes>
    </>
  );
}

export default App;
