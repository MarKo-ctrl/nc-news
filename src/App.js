import './App.css';
import React from 'react';
import { Routes, Route } from "react-router-dom";
import { Home } from './components/Home'
import { Nav } from './components/Nav';
import { Articles } from './components/Articles';
import { Article } from './components/Article';


function App() {
  return (
    <div className="App">
      <Nav/>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/articles'  element={<Articles />}/>
        <Route path='/article/:article_id' element={<Article />}/>
        <Route path='/topics/:slug' element={<Articles />} />
      </Routes>
    </div>
  );
}

export default App;
