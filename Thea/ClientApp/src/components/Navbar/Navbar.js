import React from 'react';
import './Navbar.css';

const NavBar = () => {
    return (
        <div id="nav">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse"  id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <a className="nav-link" href="/">Home</a>
                        </li>
                        <li className="nav-item active">
                            <a className="nav-link" href="/">About The Project</a>
                        </li>
                        <li className="nav-item active">
                            <a className="nav-link" href="/">Checkered Eyes</a>
                        </li>
                        <li className="nav-item active">
                            <a className="nav-link" href="/">Store</a>
                        </li>
                        <li className="nav-item active">
                            <a className="nav-link" href="/">Resources</a>
                        </li>
                        <li className="nav-item active">
                            <a className="nav-link" href="/">Blog & Socials</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}

export default NavBar;