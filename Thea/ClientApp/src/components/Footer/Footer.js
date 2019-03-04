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
                            <p>Address: 409 Peirson Ave., Port Elgin, Ontario, Canada    N0H 2C1 </p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-4">
                            <p>Call Local: (519)-389-4956 </p>
                        </div>
                        <div className="col-4">
                            <p>Call Toll Free: 1-(844)-880-4956</p>
                        </div>
                        <div className="col-4">
                            <p> Email: info@checkeredeye.com</p>
                        </div>
                    </div>
                </div>
                <hr />
                © 2019 The Checkered Eye Project. All rights reserved. All Postive Revision.
* Logo and symbol are trademark and copyright of Libby Thaw. 
            </div>
            
        </div>
    );
}

export default Footer;