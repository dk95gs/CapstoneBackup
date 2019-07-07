import React, { Component } from 'react';
import { Timeline } from 'react-twitter-widgets'
import GenericBlock from '../../components/GenericBlock/GenericBlock';
import Socials from '../../components/Socials/Socials';
import Popup from '../../components/Popup/Popup';
import { SocialEditForm } from './SocialEditForm/SocialEditForm';
import { clearUrlHash } from '../../Helper';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Social.css';

export class Social extends Component {
    displayName = Social.name;
    constructor(props) {
        super(props);
        this.state = {
            socials: []
        };
        clearUrlHash();
    }
    fillState = () => {
        axios.get(window.location.origin + '/api/socialmedias').then(response => {
            this.setState({
                socials: response.data
            });
        })
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
                    <Link
                        to='/social#socialEdit'
                        onClick={() =>
                            window.location.hash = '#socialEdit'
                        }
                        className="btn btn-secondary"
                    >Edit Page </Link>
                </div>;
            editForm =
                <Popup pageName="Socials Page" style={styles} popupId="socialEdit" >
                     <SocialEditForm fillState={this.fillState} />
                </Popup>;
        }
        return (
            <div className="myContainer">
                <input type="button" onClick={this.props.click} className="btn btn-warning btnSwitch" value="Switch Colors" />
                <div className="myContainerHeader" id="myContainerHeader" style={headerStyles}>
                    <h1>Social Media</h1>
                    {editButton}             
                </div>
                {editForm}
                <GenericBlock
                    heading="Our Social Media "
                    styles={styles}
                    noContent={true}>
                    <Socials socials={this.state.socials}/>
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
