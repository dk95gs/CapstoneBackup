import React, { Component } from 'react';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import { Link } from 'react-router-dom';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './AddItemForm.css';

export class AddItemForm extends Component {
    displayName = AddItemForm.name;
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: [],
            file: null,
            code: ''
        };
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.resetForm = this.resetForm.bind(this);

        this.handleFileChange = this.handleFileChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleCodeChange = this.handleCodeChange.bind(this);
    }
    handleNameChange(event) {
        this.setState({
            name: event.target.value
        });
    }
    handleDescriptionChange(event) {
        this.setState({
            description: event.target.value.split("\n")
        });
    }
    handleCodeChange(event) {
        this.setState({
            code: event.target.value
        });
    }
    handleFileChange(event) {
        this.setState({
            file: event.target.files[0]
        });
        
    }
    resetForm() {
        this.setState({
            name: '',
            description: [],
            code: ''
        });
        document.getElementById("popup-container").scrollTop = 0;
        window.location.hash = "#root";
    }
    saveData() {
        let fd = new FormData();
        if (this.state.file !== null) {
            fd.append('file', this.state.file, this.state.file.name);
            console.log(this.state.file);
        }
        fd.append('name', this.state.name);
        fd.append('description', JSON.stringify(this.state.description));
        fd.append('code', this.state.code);
        
        let headers = {
            headers: {
                Authorization: "bearer " + sessionStorage.getItem("token")
            }
        };
        axios.post(window.location.origin + "/api/shopitems", fd, headers).then(resp => {
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

    render() {
        let description = null;
        description = this.state.description.join("\n");
        return (
            <div>
                <Link
                    to='/store#root'
                    onClick={this.resetForm}
                    className="popup-close">&times;</Link>
                <form>
                    <div className="form-group">
                        <label> Name </label>
                        <input value={this.state.name} onChange={this.handleNameChange} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label> Item Description  </label>
                        <textarea rows="7" value={description} onChange={this.handleDescriptionChange} className="form-control"></textarea>
                    </div>
                    <div className="form-group">
                        <label> Code  </label>
                        <input value={this.state.code} onChange={this.handleCodeChange} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label> Upload Image </label>
                        <input type="file" onChange={this.handleFileChange} className="form-control" />
                    </div>
                    <Link
                        to='/store#storeItemAdd'
                        onClick={this.handleFormSubmit}
                        className="btn btn-primary">Save Changes </Link>

                    <Link
                        to='/store#root'
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