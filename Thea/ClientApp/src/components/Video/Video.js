import React from 'react';
import './Video.css';
const Video = (props) => {
    return (
        <div className="video" dangerouslySetInnerHTML={{ __html:props.video}}></div>
        );
}

export default Video;