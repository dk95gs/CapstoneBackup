import React from 'react';
import './GenericBlock.css';
const GenericBlock = (props) => {
    let content = props.content;
    return (
        <div className="welcomeBlock" id="welcomeBlock" style={props.styles}>
            <h1>{props.heading}</h1>
            <h2>{props.subHeading}</h2>
            <div className="welcomeBlockContent">
                {content.map((p) => {
                    return <p>{p}</p>
                })}
            </div>
        </div>
        );
}

export default GenericBlock;