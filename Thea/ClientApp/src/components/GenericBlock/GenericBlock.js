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
                    props.isFAQ !== true ?
                        props.noContent !== true ?
                            props.isList === true ?
                                <ul>
                                    {
                                        content.map((p, i) => {
                                            return <li key={i}>{p}</li>
                                        })
                                    }
                                </ul>
                                : content.map((p, i) => {
                                    return <p key={i}>{p}</p>
                                })
                            : null
                        : content.map((p, index) => {
                            return <div key={index}>
                                <p style={{ fontWeight: "bold" }}>{index + 1 + ". "}{p.question}</p>
                                {p.answer.map((a, i) => {
                                    return <p key={i}> {a} </p>
                                })}
                            </div>
                        })
                }         
                {props.children}
            </div>
            <h3> {props.videoDescription}</h3>
        </div>
        );
}

export default GenericBlock;