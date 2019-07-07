import React, { Component } from 'react';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import { Link } from 'react-router-dom';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './StoreEditForm.css';

export class StoreEditForm extends Component {
    displayName = StoreEditForm.name;
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            heading: '',
            description: [],
            purchaseInfoHeading: '',
            purchaseInfo: []
        }
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.resetForm = this.resetForm.bind(this);

        this.handleHeadingChange = this.handleHeadingChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handlePurchaseInfoHeading = this.handlePurchaseInfoHeading.bind(this);
        this.handlePurchaseInfoContent = this.handlePurchaseInfoContent.bind(this);
    }
    fillState() {
        axios.get(window.location.origin + "/api/storepage").then(response => {
            this.setState({
                id: response.data.id,
                heading: response.data.heading,
                description: JSON.parse(response.data.description),
                purchaseInfoHeading: response.data.purchaseInfoHeading,
                purchaseInfo: JSON.parse(response.data.purchaseInfo)
            });
        });
    }
    resetForm() {
        this.fillState();
        document.getElementById("popup-container").scrollTop = 0;
        window.location.hash = "#root";
    }
    saveData() {
        let payload = {
            id: this.state.id,
            heading: this.state.heading,
            description: JSON.stringify(this.state.description),
            purchaseInfoHeading: this.state.purchaseInfoHeading,
            purchaseInfo: JSON.stringify(this.state.purchaseInfo)
        };
        console.log(payload);
        let headers = {
            headers: {
                Authorization: "bearer " + sessionStorage.getItem("token")
            }
        };
        axios.post(window.location.origin + "/api/storepage", payload, headers).then(resp => {
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
    handleHeadingChange(event) {
        this.setState({
            heading: event.target.value
        });
    }
    handleDescriptionChange(event) {
        this.setState({
            description: event.target.value.split("\n")
        });
    }
    handlePurchaseInfoHeading(event) {
        this.setState({
            purchaseInfoHeading: event.target.value
        });
    }
    handlePurchaseInfoContent(event) {
        this.setState({
            purchaseInfo: event.target.value.split("\n")
        });
    }
    componentDidMount() {
        this.fillState();
    }
    render() {
        let description = null;
        let purchaseInfo = null;
        try {
            purchaseInfo = this.state.purchaseInfo.join("\n");
            description = this.state.description.join("\n");
        } catch (e) {
            console.log(e);
        }
        return (
            <div>
                <Link
                    to='/store#root'
                    onClick={this.resetForm}
                    className="popup-close">&times;</Link>
                <form>
                    <div className="form-group">
                        <label> Store Description Header </label>
                        <input value={this.state.heading} onChange={this.handleHeadingChange} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label> Store Description </label>
                        <textarea value={description} rows="7" onChange={this.handleDescriptionChange} className="form-control"></textarea>
                    </div>
                    <div className="form-group">
                        <label> Purchase Info Header </label>
                        <input value={this.state.purchaseInfoHeading} onChange={this.handlePurchaseInfoHeading} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label> Purchase Info Content </label>
                        <textarea value={purchaseInfo} rows="7" onChange={this.handlePurchaseInfoContent} className="form-control"></textarea>
                    </div>

                    <Link
                        to='/store#storeEdit'
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