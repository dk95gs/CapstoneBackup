import React, { Component } from 'react';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import { Link } from 'react-router-dom';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './AddCommentForm.css';

export class AddCommentForm extends Component {
    displayName = AddCommentForm.name;
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            body: []
        };
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.resetForm = this.resetForm.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleBodyChange = this.handleBodyChange.bind(this);
    }
    handleNameChange(event) {
        this.setState({
            name: event.target.value
        });
    }
    handleBodyChange(event) {
        this.setState({
            body: event.target.value.split("\n")
        });
    }
    resetForm() {
        this.setState({
            name: '',
            body: []
        });
        document.getElementById("popup-container").scrollTop = 0;
        window.location.hash = "#root";
    }
    saveData() {
        let payload = {
            name: this.state.name,
            body: JSON.stringify(this.state.body),
            blogId: this.props.id
        };
        
        let headers = {
            headers: {
                Authorization: "bearer " + sessionStorage.getItem("token")
            }
        };
        axios.post(window.location.origin + "/api/comments", payload, headers).then(resp => {
            this.props.fillState();
            this.resetForm();
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

    render() {
        let body = null;
        body = this.state.body.join("\n");
        return (
            <div>
                <Link
                    to='/blogs#root'
                    onClick={this.resetForm}
                    className="popup-close">&times;</Link>
                <form>
                    <div className="form-group">
                        <input hidden type="text" value={this.props.id} />
                        <label> Your Name </label>
                        <input value={this.state.name} onChange={this.handleNameChange} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label> Comment  </label>
                        <textarea rows="7" value={body} onChange={this.handleBodyChange} className="form-control"></textarea>
                    </div>
                    <Link
                        to='/blog#commentAdd'
                        onClick={this.handleFormSubmit}
                        className="btn btn-primary">Save Changes </Link>

                    <Link
                        to='/blogs#root'
                        onClick={this.resetForm}
                        className="btn btn-danger"
                        style={{ marginLeft: "1rem" }}>
                        Cancel
                    </Link>
                </form>
            </div>
    );
  }
}