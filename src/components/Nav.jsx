import React from 'react';
import { Link } from "react-router-dom";
import { useState, useContext } from 'react';
import { getTopics } from '../utils/api';
import { toTitleCase } from '../utils/helpers';
import { UserContext } from '../context/User';

export const Nav = () => {
  const [topics, setTopics] = useState([]);
  const { user } = useContext(UserContext)
  const handleClick = (event) => {
    event.preventDefault();
    const slug = [];
    getTopics()
      .then((topics) => {
        topics.forEach(element => slug.push(element.slug));
        setTopics(slug);
      })
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03"
            aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
            <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
              <li className='nav-item  fs-4'>
                <Link
                  to="/home"
                  className='nav-link'>
                  Home
                </Link>
              </li>
              <li className='nav-item dropdown  fs-4'>
                <Link
                  to="#"
                  className='nav-link dropdown-toggle'
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  onClick={handleClick}>
                  Topics
                </Link>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  {topics.map((topic) => {
                    return <li key={topic}>
                      <Link
                        to={`/topics/${topic}`}
                        className="dropdown-item" >
                        {toTitleCase(topic)}
                      </Link>
                    </li>
                  })}
                </ul>
              </li>
              <li className='nav-item  fs-4'>
                <Link
                  to="/articles"
                  className='nav-link'>
                  Articles
                </Link>
              </li>
            </ul>
            <ul className='nav justify-content-end'>
              {!user.username ?
                <li className='nav-item'>
                  <Link
                    to='/login'
                    className='nav-link fs-6'>
                    Login
                  </Link>
                </li>
                :
                <>
                  <li className='nav-item'>
                    <Link
                      to='/user/profile'
                      className='nav-link '>
                      Profile
                    </Link>
                  </li>
                  <li className='nav-link disabled'>
                    {user.username}
                  </li>
                </>
              }
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}
