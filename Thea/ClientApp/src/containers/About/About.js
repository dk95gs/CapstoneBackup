import React, { Component } from 'react';
import GenericBlock from '../../components/GenericBlock/GenericBlock';
import Popup from '../../components/Popup/Popup';
import { AboutEditForm } from './AboutEditForm/AboutEditForm';
import { Link } from 'react-router-dom';
import axios from 'axios';

export class About extends Component {
    displayName = About.name;
    state = {
        id:1,
        aboutHeading: '',
        aboutContent: [],
        ackTitle: '',
        ackSubTitle:'',
        ackContent: [],
        FAQBlockQA: []
    }
    componentDidMount() {

        axios.get(window.location.origin + "/api/About").then(response => {
            const data = response.data;
            this.setState({
                id: data.id,
                aboutHeading: data.aboutBlockHeading,
                aboutContent: JSON.parse(data.aboutBlockContent),
                ackTitle: data.achnowledgementsBlockTitle,
                ackSubTitle: data.achnowledgementsBlockDescription,
                ackContent: JSON.parse(data.achnowledgementsBlockList),
                FAQBlockQA: JSON.parse(data.faqBlockQA)
            });
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
        let editButton = null;
        let editForm = null;
        if (this.props.checkIfLoggedIn()) {
            editButton =
                <div className="editButtonContainer">
                <Link
                    to='/about#aboutEdit'
                    onClick={() =>
                        window.location.hash = '#aboutEdit'
                    }
                    className="btn btn-secondary"
                >Edit Page </Link>
                </div>;
            editForm =
                <Popup pageName="About Page" style={styles} popupId="aboutEdit" >
                <AboutEditForm />
                </Popup>;
        }
        return (
            <div className="myContainer">
                <input type="button" onClick={this.props.click} className="btn btn-warning btnSwitch" value="Switch Colors" />
                <div className="myContainerHeader" id="myContainerHeader" style={headerStyles}>
                    <h1>About The Project</h1>
                    {editButton}
                </div>
                {editForm}
                <GenericBlock
                    heading={this.state.aboutHeading}
                    content={this.state.aboutContent}
                    styles={styles}
                    isList={false} />
                <GenericBlock
                    heading={this.state.ackTitle}
                    subHeading={this.state.ackSubTitle}
                    content={this.state.ackContent}
                    styles={styles}
                    isList={true} />
                <GenericBlock
                    heading="Frequently Asked Questions"
                    isFAQ={true}
                    faqContent={this.state.FAQBlockQA}
                    styles={styles}
                />
            </div>
            );
    }
}