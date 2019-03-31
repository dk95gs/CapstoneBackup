import React, { Component } from 'react';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import { Link } from 'react-router-dom';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './HeaderFooterEditForm.css';

export class HeaderFooterEditForm extends Component {
    displayName = HeaderFooterEditForm.name;
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            headerHeading: this.props.headerHeading,
            headerSubHeading: this.props.headerSubHeading,
            streetName: this.props.streetName,
            city: this.props.city,
            province: this.props.province,
            country: this.props.country,
            postalCode: this.props.postalCode,
            localNumber: this.props.localNumber,
            tollFreeNumber: this.props.tollFreeNumber,
            email: this.props.email,
            footerMessage: this.props.footerMessage
        }
        
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.resetForm = this.resetForm.bind(this);

        this.handleStreetName = this.handleStreetName.bind(this);
        this.handleCity = this.handleCity.bind(this);
        this.handleProvince = this.handleProvince.bind(this);
        this.handleCountry = this.handleCountry.bind(this);
        this.handlePostalCode = this.handlePostalCode.bind(this);
        this.handleLocalNumber = this.handleLocalNumber.bind(this);
        this.handleTollFreeNumber = this.handleTollFreeNumber.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handleFooterMessage = this.handleFooterMessage.bind(this);
        this.handleHeaderHeading = this.handleHeaderHeading.bind(this);
        this.handleHeaderSubHeading = this.handleHeaderSubHeading.bind(this);
    }
    resetForm() {
        this.setState({
            id: this.props.id,
            headerHeading: this.props.headerHeading,
            headerSubHeading: this.props.headerSubHeading,
            streetName: this.props.streetName,
            city: this.props.city,
            province: this.props.province,
            country: this.props.country,
            postalCode: this.props.postalCode,
            localNumber: this.props.localNumber,
            tollFreeNumber: this.props.tollFreeNumber,
            email: this.props.email,
            footerMessage: this.props.footerMessage
        });
        document.getElementById("popup-container").scrollTop = 0;
        window.location.hash = "#root";
    }
    saveData() {
        let payload = {
            id: this.state.id,
            streetName: this.state.streetName,
            city: this.state.city,
            province: this.state.province,
            country: this.state.country,
            postalCode: this.state.postalCode,
            localNumber: this.state.localNumber,
            tollFreeNumber: this.state.tollFreeNumber,
            email: this.state.email,
            footerMessage: this.state.footerMessage,
            headerHeading: this.state.headerHeading,
            headerSubHeading: this.state.headerSubHeading
        };
        axios.post(window.location.origin + "/api/contactinfo", payload).then(resp => {
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
    handleStreetName(event) {
        this.setState({
            streetName: event.target.value
        });
    }
    handleCity(event) {
        this.setState({
            city: event.target.value
        });
    }
    handleProvince(event) {
        this.setState({
            province: event.target.value
        });
    }
    handleCountry(event) {
        this.setState({
            country: event.target.value
        });
    }
    handlePostalCode(event) {
        this.setState({
            postalCode: event.target.value
        });
    }
    handleLocalNumber(event) {
        this.setState({
            localNumber: event.target.value
        });
    }
    handleTollFreeNumber(event) {
        this.setState({
            tollFreeNumber: event.target.value
        });
    }
    handleEmail(event) {
        this.setState({
            email: event.target.value
        });
    }
    handleFooterMessage(event) {
        this.setState({
            footerMessage: event.target.value
        });
    }
    handleHeaderHeading(event) {
        this.setState({
            headerHeading: event.target.value
        });
    }
    handleHeaderSubHeading(event) {
        this.setState({
            headerSubHeading: event.target.value
        });
    }
    render() {
        return (
            <div>
                <Link
                    to='/#root'
                    onClick={this.resetForm}
                    className="popup-close">&times;</Link>
                <form>
                    <div className="form-group">
                        <label> Header Title</label>
                        <input value={this.state.headerHeading} onChange={this.handleHeaderHeading} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label> Header Sub Title</label>
                        <input value={this.state.headerSubHeading} onChange={this.handleHeaderSubHeading} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label> Street Name</label>
                        <input value={this.state.streetName} onChange={this.handleStreetName} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label> City</label>
                        <input value={this.state.city} onChange={this.handleCity} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label> Province</label>
                        <input value={this.state.province} onChange={this.handleProvince} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label> Country </label>
                        <input value={this.state.country} onChange={this.handleCountry} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label> Postal Code </label>
                        <input value={this.state.postalCode} onChange={this.handlePostalCode} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label> Local Number </label>
                        <input value={this.state.localNumber} onChange={this.handleLocalNumber} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label> Toll Free Number </label>
                        <input value={this.state.tollFreeNumber} onChange={this.handleTollFreeNumber} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label> Email </label>
                        <input value={this.state.email} onChange={this.handleEmail} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label> Footer Message </label>
                        <input value={this.state.footerMessage} onChange={this.handleFooterMessage} className="form-control" />
                    </div>
                    <Link
                        to='/#headerFooterEdit'
                        onClick={this.handleFormSubmit}
                        className="btn btn-primary">Save Changes </Link>

                    <Link
                        to='/#root'
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