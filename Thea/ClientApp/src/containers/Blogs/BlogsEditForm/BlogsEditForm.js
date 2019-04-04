import React, { Component } from 'react';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import { Link } from 'react-router-dom';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './BlogsEditForm.css';

export class BlogsEditForm extends Component {
    displayName = BlogsEditForm.name;
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            title: '',
            author: '',
            content: [],
            pictureSrcList: [],
            file: null,
            hasLoaded: false
        }
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.resetForm = this.resetForm.bind(this);

        this.handleFileUpload = this.handleFileUpload.bind(this);
        this.handleContentChange = this.handleContentChange.bind(this);
        this.handleAuthorChange = this.handleAuthorChange.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
    }
    resetForm() {
        this.setState({
            id: 0,
            title: '',
            author: '',
            content: [],
            pictureSrcList: [],
            file: null,
            hasLoaded: false
        });
       
        document.getElementById("popup-container").scrollTop = 0;
        window.location.hash = "#root";
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
        fd.append('title', this.state.title);
        fd.append('author', this.state.author);
        fd.append('content', JSON.stringify(this.state.content));
        console.log(fd);
        axios.post(window.location.origin + "/api/blogs", fd, headers).then(resp => {
            this.props.fillState();
            document.getElementById("popup-container").scrollTop = 0;
            window.location.hash = "#root";
        });
    }
    handleFormSubmit(event) {
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
    handleFileUpload = (event) => {
        this.setState({
            file: event.target.files
        });
    }
    handleContentChange = (event) => {
        this.setState({
            content: event.target.value.split("\n")
        });
    }
    render() {
        let contentString = null;
        let imageRows = [];
        try {
            this.props.pictureSrcList.map((p, index) => {
                imageRows.push(
                    <tr>
                        <td> <img className="tableCellImg" src={window.location.origin + "/" + p} alt="Blog" /></td>
                        <td> <input type="button" className="btn btn-danger" onClick={() => { this.props.deleteSingleImage(p, index) }} value="Delete" /></td>
                    </tr>
                );
                return true;
            });
        } catch (e) {
            console.log("error");
        }
        let formBody = null;
        if (this.props.crudType === "edit") {
            try {
                if (this.props.content !== null || this.props.content !== undefined) {
                    contentString = this.props.content.join("\n");
                }
            } catch (e) {
                console.log("error");
            }
            formBody =
                <form>
                    <div className="form-group">
                        <label> Blog Title</label>
                        <input value={this.props.title} onChange={this.props.handleTitleChange} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label> Author</label>
                        <input value={this.props.author} onChange={this.props.handleAuthorChange} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label> Content</label>
                        <textarea value={contentString} onChange={this.props.handleContentChange} rows="7" className="form-control"></textarea>
                    </div>
                    <table className="table">
                        <thead>
                        </thead>
                        <tbody>
                            {imageRows}
                        </tbody>
                    </table>
                    <div className="form-group">
                        <label> Upload Images</label>
                    <input type="file" multiple="multiple" onChange={this.props.handleFileUpload} className="form-control" />
                </div>
                <Link
                    to='/blogs#blogEdit'
                    onClick={this.props.handleBlogUpdate}
                    className="btn btn-primary">Save Changes </Link>
            </form>
        } else {
            try {
                if (this.props.content !== null || this.props.content !== undefined) {
                    contentString = this.state.content.join("\n");
                }
            } catch (e) {
                console.log("error");
            }
            formBody =
                <form>
                    <div className="form-group">
                        <label> Blog Title</label>
                        <input value={this.state.title} onChange={this.handleTitleChange} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label> Author</label>
                        <input value={this.state.author} onChange={this.handleAuthorChange} className="form-control" />
                    </div>
                    <div className="form-group">
                    <label> Content</label>
                        <textarea value={contentString} onChange={this.handleContentChange} rows="7" className="form-control"></textarea>
                    </div>
                    <div className="form-group">
                        <label> Upload Images</label>
                    <input type="file" multiple="multiple" onChange={this.handleFileUpload} className="form-control" />
                </div>
                <Link
                    to='/blogs#blogAdd'
                    onClick={this.handleFormSubmit}
                    className="btn btn-primary">Save Changes </Link>
            </form>
        }
        
        return (
            <div>
                <Link
                    to='/blogs#root'
                    onClick={this.resetForm}
                    className="popup-close">&times;</Link>
                
                    {formBody}

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