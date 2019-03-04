import React, { Component } from 'react';
import GenericBlock from '../../components/GenericBlock/GenericBlock';
import axios from 'axios';
import './CheckeredEyes.css';

export class CheckeredEyes extends Component {
    displayName = CheckeredEyes.name;
    state = {
        SymbolUseBlockTitle: "",
        SymbolUseBlockDescription: [],
        SymbolUseQAList: [],
        AttentionLowVisionBlockTitle: "",
        AttentionLowVisionBlockContent: [
        ],
        AttentionSightedBlockTitle: "",
        AttentionSightedBlockContent: []
    }
    componentDidMount() {
        axios.get(window.location.origin + "/api/checkeredeyespage").then(response => {
            const data = response.data;
            this.setState({
                SymbolUseBlockTitle: data.symbolUseBlockTitle,
                SymbolUseBlockDescription: JSON.parse(data.symbolUseBlockDescription),
                SymbolUseQAList: JSON.parse(data.symbolUseQAList),
                AttentionLowVisionBlockTitle: data.attentionLowVissionBlockTitle,
                AttentionLowVisionBlockContent: JSON.parse(data.attentionLowVisionBlockContent),
                AttentionSightedBlockTitle: data.attentionSightedBlockTitle,
                AttentionSightedBlockContent: JSON.parse(data.attentionSightedBlockContent)
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
                    <h1>Checkered Eyes</h1>
                </div>
                <GenericBlock
                    heading={this.state.SymbolUseBlockTitle}
                    content={this.state.SymbolUseBlockDescription}
                    isFAQ={true}
                    hasContentAndFAQ={true}
                    styles={styles}
                    faqContent={this.state.SymbolUseQAList}>
                    <p style={{fontWeight:"bold"}}>We appreciate your regard and cooperation.</p>
                </GenericBlock>
                <GenericBlock
                    heading={this.state.AttentionLowVisionBlockTitle}
                    content={this.state.AttentionLowVisionBlockContent}
                    styles={styles}
                />
                <GenericBlock
                    heading={this.state.AttentionSightedBlockTitle}
                    content={this.state.AttentionSightedBlockContent}
                    styles={styles}
                />
            </div>
    );
  }
}
