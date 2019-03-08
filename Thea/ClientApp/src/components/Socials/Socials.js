import React from 'react';
import './Socials.css';
const Socials = (props) => {
    return (
        <div className="socialContainer">
            {
                props.socials.map((s, index) => {
                    return <a key={index} href={s.hrefUrl} target="_blank"> <img src={window.location.origin + s.imageURL} alt={index} className="socialImg" /> </a>
                })
            }
        </div>
        )
}

export default Socials;