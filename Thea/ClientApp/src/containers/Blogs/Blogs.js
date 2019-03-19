import React, { Component } from 'react';
import GenericBlock from '../../components/GenericBlock/GenericBlock';
import Blog from '../../components/Blog/Blog';
import axios from 'axios';
import './Blogs.css';

export class Blogs extends Component {
    displayName = Blogs.name;
    state = {
        blogs: []
    };
    componentDidMount() {
        axios.get(window.location.origin + '/api/blogs').then(response => {
            this.setState({
                blogs: response.data
            });
            console.log(this.state.blogs);
        })
    }
    render() {
        const styles = {
            color: this.props.fontColor,
            backgroundColor: this.props.bgColor
        };
        const headerStyles = {
            filter: localStorage.getItem("headerFilter")
        };
        let blogPosts = this.state.blogs.map((blog, index) => {
            return <GenericBlock
                noContent={true}
                heading={blog.title}
                styles={styles}>
                <Blog
                    content={JSON.parse(blog.content)}
                    author={blog.author}
                    postedDate={blog.postedDate}
                    pictureSrcList={JSON.parse(blog.pictureSrcList)}
                />
            </GenericBlock>
        });
        return (
            <div className="myContainer">
                <input type="button" onClick={this.props.click} className="btn btn-warning btnSwitch" value="Switch Colors" />
                <div className="myContainerHeader" id="myContainerHeader" style={headerStyles}>
                    <h1>Blog</h1>
                </div>
                {blogPosts}
      </div>
    );
  }
}
