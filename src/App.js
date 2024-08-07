// import logo from './logo.svg';
import './App.css';
import React from 'react';
// import { Route, Switch } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';

import HomeView from './views/HomeView';
import NewProduct from './views/newProductView';

function App() {
  return (
    <div className="App">
      {/* Routers for navigation */}
      <Routes>
        <Route path='/' element={<HomeView />} />
        <Route path='/new-product' element={<NewProduct />} />
      </Routes>
    </div>
  );
}

export default App;
