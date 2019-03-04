import React, { Component } from 'react';
import GenericBlock from '../../components/GenericBlock/GenericBlock';
import axios from 'axios';

export class About extends Component {
    displayName = About.name;
    state = {
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
        return (
            <div className="myContainer">
                <input type="button" onClick={this.props.click} className="btn btn-warning btnSwitch" value="Switch Colors" />
                <div className="myContainerHeader" id="myContainerHeader" style={headerStyles}>
                    <h1>About The Project</h1>
                </div>
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