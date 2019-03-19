import React from 'react';
import logo from '../../images/lowvision.png'
import './Header.css'
const Header = (props) => {
    return (
        <div>
            <div className="headerMain" id="headerMain">          
                <div>                  
                    <span className="headerHeading">{props.header}</span>
                </div>
                <img className="headerLogo" src={logo} alt="logo" />
                <div>
                    <span className="headerSubHeading"> {props.subHeading} </span>
                </div>
               
            </div>
            <div className="headerUnderline"></div>
        </div>
    );
}

export default Header;