import React, { Component } from 'react';
import { Timeline } from 'react-twitter-widgets'
import GenericBlock from '../../components/GenericBlock/GenericBlock';
import Socials from '../../components/Socials/Socials';
import axios from 'axios';
import './Social.css';

export class Social extends Component {
    displayName = Social.name;
    state = {
        socials: []
    };
    componentDidMount() {
        axios.get(window.location.origin + '/api/socialmedias').then(response => {
            this.setState({
                socials: response.data
            });
        })
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
                    <h1>Social Media</h1>
                </div>
                <GenericBlock
                    heading="Our Social Media "
                    styles={styles}
                    noContent={true}
                >
                    <Socials
                        socials={this.state.socials}
                        
                    />
                </GenericBlock>
                <GenericBlock 
                    noContent={true}
                    styles={styles} >                   
                    <Timeline
                        dataSource={{
                            sourceType: 'profile',
                            screenName: 'LibbyThaw'
                        }}
                        options={{
                            username: 'LibbyThaw',
                            height: '800',
                            theme: this.props.twitterTheme
                        }}
                        onLoad={() => console.log('Timeline is loaded!')}
                    />
                </GenericBlock>
      </div>
    );
  }
}
