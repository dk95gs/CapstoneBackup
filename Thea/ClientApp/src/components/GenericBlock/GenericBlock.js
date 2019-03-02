import React from 'react';
import './GenericBlock.css';
const GenericBlock = (props) => {
    let content = props.content;
    return (
        <div className="genericBlock" id="genericBlock" style={props.styles}>
            <h1>{props.heading}</h1>
            <h3>{props.subHeading}</h3>
            <div className="genericBlockContent">
                {
                    props.noContent != true ? 
                        props.isList == true ?
                            <ul>
                                {
                                    content.map((p) => {
                                        return <li>{p}</li>
                                    })
                                }
                            </ul>
                            : content.map((p) => {
                                return <p>{p}</p>
                            })
                     : null
                }         
                {props.children}
            </div>
            <h3> {props.videoDescription}</h3>
        </div>
        );
}

export default GenericBlock;