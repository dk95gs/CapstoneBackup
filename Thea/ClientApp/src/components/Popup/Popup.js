import React from 'react';
import './Popup.css';
const Popup = (props) => {
    return (
        <div className="popup" id={props.popupId}>
            <div className="popup-container " style={props.style} id="popup-container">  
                <h1> {props.pageName} </h1>
                <div className="popup-content">
                    {props.children}
                </div>
            </div>
        </div>

        );
}

export default Popup;