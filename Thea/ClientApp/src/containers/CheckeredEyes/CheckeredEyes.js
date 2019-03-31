import React, { Component } from 'react';
import GenericBlock from '../../components/GenericBlock/GenericBlock';
import { CheckeredEyesEditForm } from './CheckeredEyesEditForm/CheckeredEyesEditForm';
import { clearUrlHash } from '../../Helper';
import { Link } from 'react-router-dom';
import Popup  from '../../components/Popup/Popup';
import axios from 'axios';
import './CheckeredEyes.css';

export class CheckeredEyes extends Component {
    displayName = CheckeredEyes.name;
    constructor(props) {
        super(props);
        this.state = {
            SymbolUseBlockTitle: "",
            SymbolUseBlockDescription: [],
            SymbolUseQAList: [],
            AttentionLowVisionBlockTitle: "",
            AttentionLowVisionBlockContent: [
            ],
            AttentionSightedBlockTitle: "",
            AttentionSightedBlockContent: []
        }
        clearUrlHash();
    }
    fillState = () => {
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
                        to='/checkeredeyes#checkeredeyesEdit'
                        onClick={() =>
                            window.location.hash = '#checkeredeyesEdit'
                        }
                        className="btn btn-secondary">Edit Page </Link>
                </div>;
            editForm =
                <Popup pageName="Checkered Eyes Edit Page" style={styles} popupId="checkeredeyesEdit" >
                    <CheckeredEyesEditForm fillState={this.fillState} />
                </Popup>;
        }
        return (
            <div className="myContainer">
                <input type="button" onClick={this.props.click} className="btn btn-warning btnSwitch" value="Switch Colors" />
                <div className="myContainerHeader" id="myContainerHeader" style={headerStyles}>
                    <h1>Checkered Eyes</h1>
                    {editButton}
                    {editForm}
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
