import React, { Component } from 'react';
import GenericBlock from '../../components/GenericBlock/GenericBlock';
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
            'The awareness of a persons hidden needs can alleviate confusion, frustration, and embarrassment, for people with blindness and those with whom they interact. ']
    };
    
    render() {
        const styles = {
            color: this.props.fontColor,
            backgroundColor: this.props.bgColor
        };
        return (
            <div className="myContainer">
                <input type="button" onClick={this.props.click} className="btn btn-warning btnSwitch" value="Switch Colors" />
                <div className="myContainerHeader">
                    <h1>Home</h1>
                </div>
                <GenericBlock
                        heading={this.state.welcomeHeading}
                        subHeading={this.state.welcomeSubHeading}
                        content={this.state.welcomeContent}
                        styles={styles}/>
      </div>
    );
  }
}
