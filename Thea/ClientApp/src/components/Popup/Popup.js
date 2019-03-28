import React from 'react';
import './Popup.css';
const Popup = (props) => {
    return (
        <div className="popup" id="popup" style={props.style}>
            <div className="popup-container " id="popup-container">  
                <h1>Manage {props.pageName} Content</h1>
                <div className="popup-content">
                    {props.children}
                </div>
            </div>
        </div>

        );
}

export default Popup;