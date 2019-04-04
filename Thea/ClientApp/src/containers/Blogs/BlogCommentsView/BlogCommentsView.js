import React, { Component } from 'react';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import { Link } from 'react-router-dom';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './BlogCommentsView.css';

export class BlogCommentsView extends Component {
    displayName = BlogCommentsView.name;
    constructor(props) {
        super(props);
        this.state = {
            blogComments:[]
        };
    }
    resetForm() {
        
        window.location.hash = "#root";
    }
    render() {
        let blogComments = [];
        console.log(this.props.blogComments);
        this.props.blogComments.map((c, index) => {
            let paragraphs = [];
            let postedDate = c.postedDate.slice(0, c.postedDate.indexOf("T"));
            let body = JSON.parse(c.body);
            body.map((p, index) => {
                paragraphs.push(
                    <p> {p}</p>
                );
            });
            blogComments.push(
                <div className="comment">
                    <h1> Posted By: {c.name} </h1>
                    <h2> Posted Date: {postedDate} </h2>
                    {paragraphs}
                </div>
            );
        });
        return (
            <div>
                <Link
                    to='//blogs#root'
                    onClick={this.resetForm}
                    className="popup-close">&times;</Link>
                {blogComments}
                <Link
                    to='/blogs#root'
                    onClick={this.resetForm}
                    className="btn btn-danger"
                    style={{ marginLeft: "1rem" }}>
                    Cancel
                    </Link>
            </div>
    );
  }
}