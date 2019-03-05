import React, { Component } from 'react';
import { Timeline } from 'react-twitter-widgets'
import GenericBlock from '../../components/GenericBlock/GenericBlock';
//import axios from 'axios';
import './BlogSocial.css';

export class BlogSocial extends Component {
    displayName = BlogSocial.name;
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
                    <h1>Blog & Socials</h1>
                </div>
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