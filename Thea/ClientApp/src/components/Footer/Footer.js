import React from 'react';
import './Footer.css';
const Footer = (props) => {
    return (
        <div>
            <div className="footerUnderline"></div>
            <div className="footerMain" id="footerMain" style={props.styles}>          
                <div className="contact">
                    <div className="row">
                        <div className="col-12">
                            <p>{props.streetName}, {props.city}, {props.province}, {props.country} {props.postalCode} </p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-4">
                            <p>Call Local: {props.localNumber} </p>
                        </div>
                        <div className="col-4">
                            <p>Call Toll Free:{props.tollFreeNumber}</p>
                        </div>
                        <div className="col-4">
                            <p> Email: {props.email}</p>
                        </div>
                    </div>
                </div>
                <hr />
                © {props.footerMessage}
            </div>
            
        </div>
    );
}

export default Footer;