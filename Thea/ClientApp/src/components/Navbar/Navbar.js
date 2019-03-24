import React from 'react';
import { Link } from 'react-router-dom';

import './Navbar.css';

const NavBar = () => {
    return (
        <div id="nav">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              
                <div className=" navbar-collapse"  id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item active">
                            <Link className="nav-link" to="/About">About The Project</Link>
                        </li>
                        <li className="nav-item active">
                            <Link className="nav-link" to="/checkeredeyes">Checkered Eyes</Link>
                        </li>
                        <li className="nav-item active">
                            <Link className="nav-link" to="/store">Store</Link>
                        </li>
                        <li className="nav-item active">
                            <Link className="nav-link" to="/resources">Resources</Link>
                        </li>
                        <li className="nav-item active">
                            <Link className="nav-link" to="/blogsocial">Socials</Link>
                        </li>
                        <li className="nav-item active">
                            <Link className="nav-link" to="/blogs">Blog</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}

export default NavBar;