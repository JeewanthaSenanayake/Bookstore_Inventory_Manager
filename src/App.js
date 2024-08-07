// import logo from './logo.svg';
import './App.css';
import React from 'react';
// import { Route, Switch } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';

import HomeView from './views/HomeView';
import NewProduct from './views/newProductView';
import FavouriteProduct from './views/FavouriteProduct';
import EditeProduct from './views/EditeProduct';

function App() {
  return (
    <div className="App">
      {/* Routers for navigation */}
      <Routes>
        <Route path='/' element={<HomeView />} />
        <Route path='/new-product' element={<NewProduct />} />
        <Route path='/favourite-product' element={<FavouriteProduct />} />
        <Route path='/edit-product' element={<EditeProduct />} />
      </Routes>
    </div>
  );
}

export default App;
