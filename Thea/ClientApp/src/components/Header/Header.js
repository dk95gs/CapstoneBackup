import React from 'react';
import logo from '../../images/lowvision.png'
import './Header.css'
const Header = () => {
    return (
        <div>
            <div className="headerMain" id="headerMain">          
                <div>                  
                    <span className="headerHeading">THE CHECKERED EYE PROJECT</span>
                </div>
                <img className="headerLogo" src={logo} />
                <div>
                    <span className="headerSubHeading"> People wearing this symbol have partial blindness aka low vision </span>
                </div>
               
            </div>
            <div className="headerUnderline"></div>
        </div>
        );
}

export default Header;