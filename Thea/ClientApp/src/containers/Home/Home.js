import React, { Component } from 'react';
import GenericBlock from '../../components/GenericBlock/GenericBlock';
import Video from '../../components/Video/Video';
import axios from 'axios';
import './Home.css';

export class Home extends Component {
    displayName = Home.name;
    state = {
        id:"",
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
    logout = () => {
        axios.post("http://localhost:63650/api/appuser/logout").then(response => {
            console.log(response);
        });
    }
    componentDidMount() {
        axios.get(window.location.origin + "/api/home").then(response => {
            this.setState({
                id: response.data.id,
                welcomeHeading: response.data.welcomeBlockHeading,
                welcomeSubHeading: response.data.welcomeBlockSubHeading ,
                welcomeContent: JSON.parse(response.data.welcomeBlockContent),
                missionHeading: response.data.missionStatementBlockHeading ,
                missionSubHeading: response.data.missionStatementBlocSubkHeading ,
                missionContent: JSON.parse(response.data.missionStatementBlockContent),
                embededVideo: response.data.embededVideoUrl ,
                videoTitle: response.data.videoTitle ,
                videoDescription: response.data.videoDescription
            });
        });
        const login = {
            userName: "dilshan",
            password: "Dilshan1!"
        };
        axios.post("http://localhost:63650/api/appuser/login", login).then(response => {
            console.log(response);
        });
    }
    render() {
        const styles = {
            color: this.props.fontColor,
            backgroundColor: this.props.bgColor
        };
        const headerStyles = {
            filter: localStorage.getItem("headerFilter")
        };
        
        return (
            <div className="myContainer">
                <input type="button" onClick={this.props.click} className="btn btn-warning btnSwitch" value="Switch Colors" />
                <div className="myContainerHeader" id="myContainerHeader" style={headerStyles}>
                    <h1>Home</h1>
                    <button onClick={this.logout}>dsdas </button>
                </div>
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
