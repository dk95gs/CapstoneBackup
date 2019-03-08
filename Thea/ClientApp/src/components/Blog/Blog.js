import React from 'react';
import './Blog.css';
const Blog = (props) => {
    var date = props.postedDate.slice(0, props.postedDate.indexOf("T"));
    return (
        <div className="blog">
            <h4> {props.title}</h4>
            <h5>By: {props.author} {date}</h5>
            {props.content.map((p, index) => {
                return <p key={index}> {p} </p>
            })}
            {
                props.pictureSrcList.map((img, index) => {
                    return <img key={index} className="blogImg" src={window.location.origin + img} alt={'image'+index} /> 
                })
            }
        </div>
    );
}

export default Blog;