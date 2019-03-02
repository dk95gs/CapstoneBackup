import React, { Component } from 'react';
import GenericBlock from '../../components/GenericBlock/GenericBlock';
import Video from '../../components/Video/Video';
import axios from 'axios';
import './Home.css';

export class Home extends Component {
    displayName = Home.name;
    state = {
        welcomeHeading: "Welcome Block Placeholder",
        welcomeSubHeading: "Welcome Block Sub Heading Placeholder",
        welcomeContent: ['Most people who use a white cane have severe blindness, and use the cane as a tool for independent travel. ',
            'Some people use a white cane as a symbol, strictly to indicate to others that they have some degree of blindness. If a person has useful remaining eyesight, and doesn\'t need the cane as a tool, they may still choose to carry one to communicate their visual difficulties and increase their visibility in traffic.',
            'People on the blindness spectrum who do not need the white cane as a travel or safety device, may choose to use a Checkered Eye to indicate that their vision is impaired. ',
            'The awareness of a persons hidden needs can alleviate confusion, frustration, and embarrassment, for people with blindness and those with whom they interact. '],
        missionHeading: "Our Mission Statement",
        missionSubHeading: "The Checkered Eye Project mission is to cooperate with individuals and organizations in a creative manner to: ",
        missionContent: ['Increase understanding of low vision, and thereby make it more comfortable for people with low vision to be open about that aspect of their lives.',
            'Educate the public about the two options for self identification as a person with low vision, the checkered eye symbol and the white ID cane.',
            'make wearable checkered eye symbols available in many formats.'],
        embededVideo: '<iframe width="560" height="315" src="https://www.youtube.com/embed/IdFJaMWQTqc" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
        videoTitle: "Video Produced By & For The Checkered Eye Project",
        videoDescription: "Lyric video for the song Doing Fine. An awareness booster with help from Donnie Walsh of the Downchild Blues Band and Crash Test Dummies drummer Mitch Dorge. Written and sung by Libby Thaw."
    };
    
    render() {
        const styles = {
            color: this.props.fontColor,
            backgroundColor: this.props.bgColor
        };
        return (
            <div className="myContainer">
                <input type="button" onClick={this.props.click} className="btn btn-warning btnSwitch" value="Switch Colors" />
                <div className="myContainerHeader" id="myContainerHeader">
                    <h1>Home</h1>
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
