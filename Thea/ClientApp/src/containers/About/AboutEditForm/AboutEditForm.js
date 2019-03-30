import React, { Component } from 'react';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import { Link } from 'react-router-dom';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './AboutEditForm.css';

export class AboutEditForm extends Component {
    displayName = AboutEditForm.name;
    constructor(props) {
        super(props);
        this.state = {
        }
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.resetForm = this.resetForm.bind(this);


    }
    resetForm() {
        this.setState({
        });
        document.getElementById("popup-container").scrollTop = 0;
        window.location.hash = "#root";
    }
    saveData() {
        let payload = {
        };
        axios.post(window.location.origin + "/api/about", payload).then(resp => {
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
        return (
            <div>
                <Link
                    to='/about#root'
                    onClick={this.resetForm}
                    className="popup-close">&times;</Link>
                <form>
                    <div className="form-group">
                        <label> Label</label>
                        <input className="form-control" />
                    </div>
                    <div className="form-group">
                        <label> Label</label>
                        <textarea rows="7" className="form-control"></textarea>
                    </div>
                    <Link
                        to='/about#aboutEdit'
                        onClick={this.handleFormSubmit}
                        className="btn btn-primary">Save Changes </Link>

                    <Link
                        to='/about#root'
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