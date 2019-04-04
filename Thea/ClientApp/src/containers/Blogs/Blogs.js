import React, { Component } from 'react';
import GenericBlock from '../../components/GenericBlock/GenericBlock';
import Blog from '../../components/Blog/Blog';
import Popup from '../../components/Popup/Popup';
import { BlogsEditForm } from './BlogsEditForm/BlogsEditForm';
import { AddCommentForm } from './AddCommentForm/AddCommentForm';
import { BlogCommentsView } from './BlogCommentsView/BlogCommentsView';
import { clearUrlHash } from '../../Helper';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import axios from 'axios';
import './Blogs.css';

export class Blogs extends Component {
    displayName = Blogs.name;
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            title: '',
            author: '',
            content: [],
            postedDate: '',
            pictureSrcList: [],
            file: null,
            blogs: [],
            blogComments: []
        };
        clearUrlHash();
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleAuthorChange = this.handleAuthorChange.bind(this);
        this.handleContentChange = this.handleContentChange.bind(this);
        this.handleFileUpload = this.handleFileUpload.bind(this);
        this.handleBlogUpdate = this.handleBlogUpdate.bind(this);
        this.handleBlogDelete = this.handleBlogDelete.bind(this);
        this.deleteSingleImage = this.deleteSingleImage.bind(this);
    }

    fillState = () => {
        axios.get(window.location.origin + '/api/blogs').then(response => {
            this.setState({
                blogs: response.data
            });
        });
    }
    setupBlogCommentsView = (id) => {
        axios.get(window.location.origin + "/api/comments/" + id).then((resp) => {
            this.setState({
                blogComments: resp.data
            });
        });
        window.location.hash = '#commentsView';
    }
    setupAddCommentForm = (id) => {
        this.setState({
            id: id
        });
        window.location.hash = '#commentAdd';
    }
    setupEditForm = (id) => {
        axios.get(window.location.origin + '/api/blogs/' + id).then(response => {
            this.setState({
                id: response.data.id,
                title: response.data.title,
                author: response.data.author,
                content: JSON.parse(response.data.content),
                pictureSrcList: JSON.parse(response.data.pictureSrcList),
                postedDate: response.data.postedDate
            });
            
        });
        window.location.hash = '#blogEdit';
        
    }
    handleTitleChange = (event) => {
        this.setState({
            title: event.target.value
        });
    }
    handleAuthorChange = (event) => {
        this.setState({
            author: event.target.value
        });
    }
    handleContentChange = (event) => {
        this.setState({
            content: event.target.value.split("\n")
        });
    }
    handleFileUpload = (event) => {
        this.setState({
            file: event.target.files
        });

    }
    saveData() {
        let headers = {
            headers: {
                Authorization: "bearer " + sessionStorage.getItem("token")
            }
        };
        let fd = new FormData();
        if (this.state.file !== null) {
            for (var i = 0; i < this.state.file.length; i++) {

                fd.append('file', this.state.file[i], this.state.file[i].name);
            }
        }
        fd.append('id', this.state.id);
        fd.append('title', this.state.title);
        fd.append('author', this.state.author);
        fd.append('content', JSON.stringify(this.state.content));
        fd.append('pictureSrcList', JSON.stringify(this.state.pictureSrcList));
        fd.append('postedDate', this.state.postedDate);
        axios.put(window.location.origin + "/api/blogs/"+this.state.id, fd, headers).then(resp => {
            this.fillState();
            document.getElementById("popup-container").scrollTop = 0;
            window.location.hash = "#root";
        });
    }
    deleteData(id) {
        let headers = {
            headers: {
                Authorization: "bearer " + sessionStorage.getItem("token")
            }
        };
        axios.delete(window.location.origin + "/api/blogs/" + id, headers).then(resp => {
            this.fillState();
            document.getElementById("popup-container").scrollTop = 0;
        });
    }
    deleteSingleImage = (fileName, index) => {
        let headers = {
            headers: {
                Authorization: "bearer " + sessionStorage.getItem("token")
            }
        };
        let tempPicLst = [...this.state.pictureSrcList];
        tempPicLst.splice(index, 1);
        let payload = {
            id: this.state.id,
            title: fileName,
            pictureSrcList: JSON.stringify(tempPicLst)
        }
        axios.post(window.location.origin + "/api/blogs/DeleteImage", payload, headers).then(resp => {
            this.setupEditForm(payload.id);
            this.fillState();
        });
    }
    handleBlogUpdate = (event) => {
        event.preventDefault();
        confirmAlert({
            title: 'Confirm to Save Changes',
            message: 'Are you sure you want to save these changes?.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => this.saveData()
                },
                {
                    label: 'No',
                    onClick: () => { }
                }
            ]
        });
    }
    handleBlogDelete = (id, event) => {
        event.preventDefault();
        confirmAlert({
            title: 'Confirm to Save Changes',
            message: 'Are you sure you want to save these changes?.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => this.deleteData(id)
                },
                {
                    label: 'No',
                    onClick: () => { }
                }
            ]
        });
    }
    componentDidMount() {
        this.fillState();
    }
    render() {
        const styles = {
            color: this.props.fontColor,
            backgroundColor: this.props.bgColor
        };
        const headerStyles = {
            filter: localStorage.getItem("headerFilter")
        };
        let addButton = null;
        let addForm = null;
        let editForm = null;
        let commentForm = null;
        let commentsView = null;
        commentForm =
            <Popup pageName="Add Comment" style={styles} popupId="commentAdd" crudType="add" >
                <AddCommentForm fillState={this.fillState} id={this.state.id} />
            </Popup>;
        commentsView = 
            <Popup pageName="View Comments" style={styles} popupId="commentsView" >
                <BlogCommentsView blogComments={this.state.blogComments} />
            </Popup>;
        if (this.props.checkIfLoggedIn()) {
            addButton =
                <div className="editButtonContainer">
                    <Link
                        to='/blogs#blogAdd'
                        onClick={() =>
                            window.location.hash = '#blogAdd'
                        }
                        className="btn btn-secondary"
                    >Add Blog </Link>
                </div>;
            
            addForm =
                <Popup pageName="Add Blog" style={styles} popupId="blogAdd" crudType="add" >
                    <BlogsEditForm fillState={this.fillState}/>
                </Popup>;
            editForm =
                <Popup pageName="Edit Blog" style={styles} popupId="blogEdit" >
                <BlogsEditForm
                    fillState={this.fillState}
                    id={this.state.id}
                    title={this.state.title}
                    author={this.state.author}
                    content={this.state.content}
                    pictureSrcList={this.state.pictureSrcList}
                    crudType="edit"
                    handleTitleChange={this.handleTitleChange}
                    handleAuthorChange={this.handleAuthorChange}
                    handleContentChange={this.handleContentChange}
                    handleFileUpload={this.handleFileUpload}
                    handleBlogUpdate={this.handleBlogUpdate}
                    deleteSingleImage={this.deleteSingleImage}
                />
                </Popup>;
        }
        let blogPosts = this.state.blogs.map((blog, index) => {
            let editButton = null;
            let deleteButton = null;
            let addCommentButton = null;
            let viewCommentsButton = null;
            if (this.props.checkIfLoggedIn()) {
                editButton =
                    <div className="editButtonContainer">
                        <Link
                            to='/blogs#blogEdit'
                            onClick={() =>
                                this.setupEditForm(blog.id)
                            }
                            className="btn btn-secondary"
                        >Edit </Link>
                    </div>;
                deleteButton = <input value="Delete" className="btn btn-danger" onClick={(e) => { this.handleBlogDelete(blog.id, e)}} />

            }          
            addCommentButton = 
                <div className="editButtonContainer">
                    <Link
                        to='/blogs#commentAdd'
                    onClick={() =>
                            this.setupAddCommentForm(blog.id)
                        }
                        className="btn btn-secondary"
                    >Add Comment </Link>
                </div>;
            viewCommentsButton = 
                <div className="editButtonContainer">
                    <Link
                        to='/blogs#viewComments'
                    onClick={() =>
                            this.setupBlogCommentsView(blog.id)
                        }
                        className="btn btn-warning"
                    >View Comments </Link>
                </div>;
            return <GenericBlock
                noContent={true}
                heading={blog.title}
                styles={styles}>
                <Blog
                    content={JSON.parse(blog.content)}
                    author={blog.author}
                    postedDate={blog.postedDate}
                    pictureSrcList={JSON.parse(blog.pictureSrcList)}>
                    {editButton}
                    {deleteButton}
                    {addCommentButton}
                    {viewCommentsButton}
                </Blog>
            </GenericBlock>
        });
        return (
            <div className="myContainer">
                <input type="button" onClick={this.props.click} className="btn btn-warning btnSwitch" value="Switch Colors" />
                <div className="myContainerHeader" id="myContainerHeader" style={headerStyles}>
                    <h1>Blog</h1>
                    {addButton}
                </div>
                {addForm}
                {editForm}
                {commentForm}
                {commentsView}
                {blogPosts}
      </div>
    );
  }
}
