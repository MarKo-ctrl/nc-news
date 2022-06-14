import React from 'react';
import { Link } from "react-router-dom";

export const Nav = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                        <li className='nav-item'>
                            <Link to="/home" className='nav-link'>Home</Link>
                        </li>
                        <li className='nav-item dropdown'>
                            <Link to="/topics" className='nav-link dropdown-toggle' id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Topics</Link>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><Link to="#" className="dropdown-item">Topic 1</Link></li>
                                <li><Link to="#" className="dropdown-item">Topic 3</Link></li>
                                <li><Link to="#" className="dropdown-item">Topic 2</Link></li>
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
            </nav>
        </>
    )
}
