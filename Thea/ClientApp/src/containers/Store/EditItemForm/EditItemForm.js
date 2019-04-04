import React, { Component } from 'react';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import { Link } from 'react-router-dom';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './EditItemForm.css';

export class EditItemForm extends Component {
    displayName = EditItemForm.name;
    constructor(props) {
        super(props);
        this.resetForm = this.resetForm.bind(this);

    }
    resetForm() {
        document.getElementById("popup-container").scrollTop = 0;
        window.location.hash = "#root";
    }

    render() {
        let description = null;
        description = this.props.description.join("\n");
        return (
            <div>
                <Link
                    to='/store#root'
                    onClick={this.resetForm}
                    className="popup-close">&times;</Link>
                <form>
                    <div className="form-group">
                        <label> Name </label>
                        <input value={this.props.name} onChange={this.props.handleNameChange} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label> Item Description  </label>
                        <textarea rows="7" value={description} onChange={this.props.handleDescriptionChange} className="form-control"></textarea>
                    </div>
                    <div className="form-group">
                        <label> Code  </label>
                        <input value={this.props.code} onChange={this.props.handleCodeChange} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label> Upload Image </label>
                        <input type="file" onChange={this.props.handleFileChange} className="form-control" />
                    </div>
                    <Link
                        to='/store#storeItemEdit'
                        onClick={this.props.handleFormSubmit}
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