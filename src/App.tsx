import React from 'react';
import {Routes, Route} from "react-router-dom";
import { FavoritesPages } from './Pages/FavoritesPages';
import HomePage from './Pages/HomePage';
import Navigation from './Components/Navigation';

function App() {
  return (
    <>
   <Navigation/>
   <Routes>
    <Route path='/' element={<HomePage/>}/>
    <Route path='/favorites' element={<FavoritesPages/>}/>

    
   </Routes>
   </>
  );
}

export default App;
