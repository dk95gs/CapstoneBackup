import React, { Component } from 'react';
import GenericBlock from '../../components/GenericBlock/GenericBlock';
import Popup from '../../components/Popup/Popup';
import { HomeEditForm } from './HomeEditForm/HomeEditForm';
import Video from '../../components/Video/Video';
import axios from 'axios';
import './Home.css';
import { clearUrlHash } from '../../Helper';

export class Home extends Component {
    displayName = Home.name;
    constructor(props) {
        super(props);
        this.state = {
            id: 1,
            welcomeHeading: "",
            welcomeSubHeading: "",
            welcomeContent: [],
            missionHeading: "",
            missionSubHeading: "",
            missionContent: [],
            embededVideo: "",
            videoTitle: "",
            videoDescription: ""
        };
        clearUrlHash();
    }
    
    logout = () => {
        axios.post("http://localhost:63650/api/appuser/logout").then(response => {
            console.log(response);
        });
    }
    fillState = () => {
        axios.get(window.location.origin + "/api/home").then(response => {
            if (response.data !== '') {
                let parsedWelcomeContent = null;
                let parsedMissionContent = null;
                if (response.data.welcomeBlockContent !== '') {
                    parsedWelcomeContent = JSON.parse(response.data.welcomeBlockContent);
                }
                if (response.data.missionStatementBlockContent !== '') {
                    parsedMissionContent = JSON.parse(response.data.missionStatementBlockContent);
                }
                this.setState({
                    id: response.data.id,
                    welcomeHeading: response.data.welcomeBlockHeading,
                    welcomeSubHeading: response.data.welcomeBlockSubHeading,
                    welcomeContent: parsedWelcomeContent,
                    missionHeading: response.data.missionStatementBlockHeading,
                    missionSubHeading: response.data.missionStatementBlockSubHeading,
                    missionContent: parsedMissionContent,
                    embededVideo: response.data.embededVideoUrl,
                    videoTitle: response.data.videoTitle,
                    videoDescription: response.data.videoDescription
                });
            }
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
        let editButton = null;
        let editForm = null;
        if (this.props.checkIfLoggedIn()) {
            editButton =
                <div className="editButtonContainer">
                <a className="btn btn-secondary" href="#homeEdit"> Edit Page </a>
                </div>;
            editForm =
                <Popup pageName="Home Page" style={styles} popupId="homeEdit" >
                    <HomeEditForm fillState={this.fillState} />
                </Popup>;
        }
        
        return (
            <div className="myContainer">
                <input type="button" onClick={this.props.click} className="btn btn-warning btnSwitch" value="Switch Colors" />
                <div className="myContainerHeader" id="myContainerHeader" style={headerStyles}>
                    <h1>Home</h1> <br />
                    {editButton}
                    
                </div>
                {editForm}
                <GenericBlock
                    heading={this.state.welcomeHeading}
                    subHeading={this.state.welcomeSubHeading}
                    content={this.state.welcomeContent}
                    styles={styles}
                    isList={false} />
                <GenericBlock
                    heading={this.state.missionHeading}
                    subHeading={this.state.missionSubHeading}
                    content={this.state.missionContent}
                    styles={styles}
                    isList={true} />   
                
                <GenericBlock
                    heading={this.state.videoTitle}
                    videoDescription={this.state.videoDescription}
                    styles={styles}
                    noContent={true}>
                    <Video video={this.state.embededVideo} />
                </GenericBlock>
                
      </div>
    );
  }
}
