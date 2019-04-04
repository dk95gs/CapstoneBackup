import React from 'react';
import './Blog.css';
const Blog = (props) => {
    var date = props.postedDate.slice(0, props.postedDate.indexOf("T"));
    let imgs = [];
    if (props.pictureSrcList !== null) {
        props.pictureSrcList.map((img, index) => {
            imgs.push( <img key={index} className="blogImg" src={window.location.origin + "/" + img} alt={'image' + index} />)
        })
    }
    return (
        <div className="blog">
            <div className="text-center" style={{width:'100%'}}>
                <h4> {props.title}</h4>
                <h5>By: {props.author} {date}</h5>
                <div className="btn-group">
                    {props.children}
                </div>
            </div>
            {props.content.map((p, index) => {
                return <p key={index}> {p} </p>
            })}
            {imgs}
        </div>
    );
}

export default Blog;