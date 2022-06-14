import './App.css';
import React from 'react';
import { Routes, Route } from "react-router-dom";
import { Articles } from './components/Articles';
import { Nav } from './components/Nav';


function App() {
  return (
    <div className="App">
      <Nav/>
      <Routes>
        <Route path='/articles'  element={<Articles/>}/>
      </Routes>
    </div>
  );
}

export default App;
