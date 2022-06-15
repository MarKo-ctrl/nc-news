import React from 'react';
import { Link } from "react-router-dom";
import { useState } from 'react';
import { getTopics } from '../utils/api';
import { toTitleCase } from '../utils/helpers';


export const Nav = () => {
    const [topics, setTopics] = useState([]);

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
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03"
                        aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
                        <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                            <li className='nav-item'>
                                <Link to="/home" className='nav-link'>Home</Link>
                            </li>
                            <li className='nav-item dropdown'>
                                <Link to="#" className='nav-link dropdown-toggle' id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" onClick={handleClick}>Topics
                                </Link>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    {topics.map((topic) => {
                                        return <li key={topic}>
                                            <Link to={`/topics/${topic}`} className="dropdown-item" >{toTitleCase(topic)}</Link>
                                        </li>
                                    })}
                                </ul>
                            </li>
                            <li className='nav-item'>
                                <Link to="/articles" className='nav-link'>Articles</Link>
                            </li>
                            <li className='nav-item'>
                                <Link to='/user/profile' className='nav-link '>Profile</Link>
                            </li>
                            <li className='nav-item'>
                                <Link to='/login' className='nav-link'>Login</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}
