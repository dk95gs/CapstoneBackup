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
            id:'',
            welcomeHeading: props.welcomeHeading,
            welcomeSubHeading: '',
            welcomeContentString: '',
            welcomeContent: [],
            missionHeading: '',
            missionSubHeading: '',
            missionContent: [],
            missionContentString: '',
            videoHeading: '',
            videoDescription: '',
            embededVideo:''
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
    resetForm() {
        this.setState({
            id: this.props.id,
            welcomeHeading: this.props.welcomeHeading,
            welcomeSubHeading: this.props.welcomeSubHeading,
            welcomeContentString: this.props.welcomeContent.join("\n"),
            welcomeContent: this.props.welcomeContent,
            missionHeading: this.props.missionHeading,
            missionSubHeading: this.props.missionSubHeading,
            missionContent: this.props.missionContent,
            missionContentString: this.props.missionContent.join("\n"),
            videoHeading: this.props.videoHeading,
            videoDescription: this.props.videoDescription,
            embededVideo: this.props.embededVideo
        });
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
        axios.post(window.location.origin + "/api/home", payload).then(resp => {
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
    componentDidUpdate() {
        if (this.state.welcomeHeading == '') {
            this.setState({
                id:this.props.id,
                welcomeHeading: this.props.welcomeHeading,
                welcomeSubHeading: this.props.welcomeSubHeading,
                welcomeContentString: this.props.welcomeContent.join("\n"),
                welcomeContent: this.props.welcomeContent,
                missionHeading: this.props.missionHeading,
                missionSubHeading: this.props.missionSubHeading,
                missionContent: this.props.missionContent,
                missionContentString: this.props.missionContent.join("\n"),
                videoHeading: this.props.videoHeading,
                videoDescription: this.props.videoDescription,
                embededVideo: this.props.embededVideo
            });
        }
    }
    render() {
        return (
            <div className="homeEditFormContainer">
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