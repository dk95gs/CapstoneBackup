import React, { Component } from 'react';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './HomeEditForm.css';

export class HomeEditForm extends Component {
    displayName = HomeEditForm.name;
    constructor(props) {
        super(props);
        this.state = {
            id: 1,
            welcomeHeading: '',
            welcomeSubHeading: '',
            welcomeContentString: '',
            welcomeContent: '',
            missionHeading: '',
            missionSubHeading: '',
            missionContent: '',
            missionContentString: '',
            videoHeading: '',
            videoDescription: '',
            embededVideo: ''
        }
        this.handleWelcomeHeadingChange = this.handleWelcomeHeadingChange.bind(this);
        this.handleWelcomeSubHeadingChange = this.handleWelcomeSubHeadingChange.bind(this);
        this.handleWelcomeContentChange = this.handleWelcomeContentChange.bind(this);

        this.handleMissionHeadingChange = this.handleMissionHeadingChange.bind(this);
        this.handleMissionSubHeadingChange = this.handleMissionSubHeadingChange.bind(this);
        this.handleMissionContentChange = this.handleMissionContentChange.bind(this);

        this.handleVideoHeadingChange = this.handleVideoHeadingChange.bind(this);
        this.handleVideoDescriptionChange = this.handleVideoDescriptionChange.bind(this);

        this.handleEmbededVideoChange = this.handleEmbededVideoChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.resetForm = this.resetForm.bind(this);
        console.log("constructor");

    }
    handleWelcomeHeadingChange(event) {
        this.setState({
            welcomeHeading: event.target.value
        });
    }
    handleWelcomeSubHeadingChange(event) {
        this.setState({
            welcomeSubHeading: event.target.value
        });
    }
    handleWelcomeContentChange(event) {
        this.setState({
            welcomeContentString: event.target.value,
            welcomeContent: event.target.value.split('\n')
        });
    }
    handleMissionHeadingChange(event) {
        this.setState({
            missionHeading: event.target.value
        });
    }
    handleMissionSubHeadingChange(event) {
        this.setState({
            missionSubHeading: event.target.value
        });
    }
    handleMissionContentChange(event) {
        this.setState({
            missionContentString: event.target.value,
            missionContent: event.target.value.split('\n')
        });
    }
    handleVideoHeadingChange(event) {
        this.setState({
            videoHeading: event.target.value
        });
    }
    handleVideoDescriptionChange(event) {
        this.setState({
            videoDescription: event.target.value
        });
    }
    handleEmbededVideoChange(event) {
        this.setState({
            embededVideo: event.target.value
        });
    }
    fillState() {
        axios.get(window.location.origin + "/api/home").then(response => {
            if (response.data !== '') {
                let parsedWelcomeContent = null;
                let parsedMissionContent = null;
                let welcomeContentString = '';
                let missionContentString = '';

                if (response.data.welcomeBlockContent !== '') {
                    parsedWelcomeContent = JSON.parse(response.data.welcomeBlockContent);
                    welcomeContentString = parsedWelcomeContent.join("\n");
                }
                if (response.data.missionStatementBlockContent !== '') {
                    parsedMissionContent = JSON.parse(response.data.missionStatementBlockContent);
                    missionContentString = parsedMissionContent.join("\n");
                }
                this.setState({
                    id: response.data.id,
                    welcomeHeading: response.data.welcomeBlockHeading,
                    welcomeSubHeading: response.data.welcomeBlockSubHeading,
                    welcomeContent: parsedWelcomeContent,
                    welcomeContentString: welcomeContentString,
                    missionHeading: response.data.missionStatementBlockHeading,
                    missionSubHeading: response.data.missionStatementBlockSubHeading,
                    missionContent: parsedMissionContent,
                    missionContentString: missionContentString,
                    embededVideo: response.data.embededVideoUrl,
                    videoHeading: response.data.videoTitle,
                    videoDescription: response.data.videoDescription
                });
            }
        });
    }
    resetForm() {
        this.fillState();
        document.getElementById("popup-container").scrollTop = 0;
    }
    saveData() {
        let payload = {
            id: this.state.id,
            welcomeBlockHeading: this.state.welcomeHeading,
            welcomeBlockSubHeading: this.state.welcomeSubHeading,
            welcomeBlockContent: JSON.stringify(this.state.welcomeContent),
            missionStatementBlockHeading: this.state.missionHeading,
            missionStatementBlockSubHeading: this.state.missionSubHeading,
            missionStatementBlockContent: JSON.stringify(this.state.missionContent),
            embededVideoUrl: this.state.embededVideo,
            videoDescription: this.state.videoDescription,
            videoTitle: this.state.videoHeading
        };
        let headers = {
            headers: {
                Authorization: "bearer " + sessionStorage.getItem("token")
            }
        };
        axios.post(window.location.origin + "/api/home", payload, headers).then(resp => {
            this.props.fillState();
            document.getElementById("popup-container").scrollTop = 0;
            window.location.href = "#root";
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
    componentDidMount() {
        this.fillState();
    }
    render() {
        return (
            <div>
                <a href="#root" onClick={this.resetForm} className="popup-close">&times;</a>
                <form>
                    <div className="form-group">
                        <label> Welcome Block Heading </label>
                        <input value={this.state.welcomeHeading} onChange={this.handleWelcomeHeadingChange} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label> Welcome Block Sub Heading </label>
                        <input value={this.state.welcomeSubHeading} onChange={this.handleWelcomeSubHeadingChange} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label> Welcome Block Content </label>
                        <textarea value={this.state.welcomeContentString} onChange={this.handleWelcomeContentChange} rows="10" className="form-control"></textarea>
                    </div>
                    <div className="form-group">
                        <label> Mission Block Heading </label>
                        <input value={this.state.missionHeading} onChange={this.handleMissionHeadingChange} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label> Mission Block Sub Heading </label>
                        <input value={this.state.missionSubHeading} onChange={this.handleMissionSubHeadingChange} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label> Mission Block Content </label>
                        <textarea value={this.state.missionContentString} onChange={this.handleMissionContentChange} rows="10" className="form-control"></textarea>
                    </div>
                    <div className="form-group">
                        <label> Video Title </label>
                        <input value={this.state.videoHeading} onChange={this.handleVideoHeadingChange} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label> Video Description </label>
                        <textarea value={this.state.videoDescription} onChange={this.handleVideoDescriptionChange} rows="10" className="form-control"></textarea>
                    </div>
                    <div className="form-group">
                        <label> Copy & Paste the Embeded Code</label>
                        <textarea value={this.state.embededVideo} onChange={this.handleEmbededVideoChange} rows="7" className="form-control"></textarea>
                    </div>
                    <button className="btn btn-primary" onClick={this.handleFormSubmit}>Save Changes</button>
                    <a className="btn btn-danger" href="#root"  style={{marginLeft:"1rem"}}onClick={this.resetForm} > Cancel</a>
                </form>
            </div>
    );
  }
}