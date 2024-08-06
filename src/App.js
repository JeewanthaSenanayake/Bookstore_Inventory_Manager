// import logo from './logo.svg';
import './App.css';
import React from 'react';
// import { Route, Switch } from 'react-router-dom';
import HomeView from './views/HomeView';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      
      {/* <HomeView /> */}
      
      <Routes>
         <Route path='/' element={<HomeView/>} />
         {/* <Route path='/about' element={<About/>} />
         <Route path='/contact' element={<Contact/>} /> */}
       </Routes>
    </div>
  );
}

export default App;
