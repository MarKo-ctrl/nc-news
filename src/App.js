import './App.css';
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from './components/Home'
import { Nav } from './components/Nav';
import { Articles } from './components/Articles';
import { Article } from './components/Article';
import { Login } from './components/Login';
import { UserContext } from './context/User';
import { UserProfile } from './components/UserProfile'
import { SignUp } from './components/SignUp';
import { ErrorPage } from './components/ErrorPage';

function App() {
  const [user, setUser] = useState({});

  return (
      <UserContext.Provider
        value={{ user, setUser }}>
        <div className='App'>
          <Nav />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/home' element={<Home />} />
            <Route path='/articles' element={<Articles />} />
            <Route path='/article/:article_id' element={<Article />} />
            <Route path='/topics/:slug' element={<Articles />} />
            <Route path='/register' element={<SignUp />} />
            <Route path='/login' element={<Login />} />
            <Route path='/user/profile' element={<UserProfile />} />
            <Route path='*' element={<ErrorPage value={'The requested page does not exist'}/>}/>
          </Routes>
        </div>
      </UserContext.Provider>
  );
}

export default App;
