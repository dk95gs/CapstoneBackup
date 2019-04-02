import React, { Component } from 'react';
import GenericBlock from '../../components/GenericBlock/GenericBlock';
import Popup from '../../components/Popup/Popup';
import { clearUrlHash } from '../../Helper';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Resources.css';
import { PrintablesEditForm } from './PrintablesEditForm/PrintablesEditForm';
import { LinksEditForm } from './LinksEditForm/LinksEditForm';
import { DownloadsEditForm } from './DownloadsEditForm/DownloadsEditForm';

export class Resources extends Component {
    displayName = Resources.name;
    constructor(props) {
        super(props)
        this.state = {
            linkList: [],
            linkTitle: "Links",
            printList: [],
            printTitle: "Printables",
            downloadList: [],
            downloadTitle: "Downloads"
        }
        clearUrlHash();
    }
    fillState = () => {
        axios.get(window.location.origin + "/api/links").then(response => {
            this.setState({
                linkList: response.data
            });
        });
        axios.get(window.location.origin + "/api/printables").then(response => {
            this.setState({
                printList: response.data
            });
        });
        axios.get(window.location.origin + "/api/downloadables").then(response => {
            this.setState({
                downloadList: response.data
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
        let printablesEditBtn = null;
        let downloadsEditBtn = null;
        let linksEditBtn = null;

        let printablesEditForm = null;
        let downloadsEditForm = null;
        let linksEditForm = null;
        if (this.props.checkIfLoggedIn()) {
            printablesEditBtn =
                <div className="editButtonContainer">
                    <Link
                        to='/resources#printablesEdit'
                        onClick={() =>
                            window.location.hash = '#printablesEdit'
                        }
                        className="btn btn-secondary"
                    >Edit Printables </Link>
                </div>;
            downloadsEditBtn =
                <div className="editButtonContainer">
                    <Link
                        to='/resources#downloadablesEdit'
                        onClick={() =>
                            window.location.hash = '#downloadablesEdit'
                        }
                        className="btn btn-secondary"
                    >Edit Downloads </Link>
                </div>;
            linksEditBtn =
                <div className="editButtonContainer">
                    <Link
                        to='/resources#linksEdit'
                        onClick={() =>
                            window.location.hash = '#linksEdit'
                        }
                        className="btn btn-secondary"
                    >Edit Links </Link>
                </div>;
            printablesEditForm =
                <Popup pageName="Printables" style={styles} popupId="printablesEdit" >
                    <PrintablesEditForm fillState={this.fillState} />
                </Popup>;
            downloadsEditForm =
                <Popup pageName="Downloadables" style={styles} popupId="downloadablesEdit" >
                    <DownloadsEditForm fillState={this.fillState} />
                </Popup>;
            linksEditForm =
                <Popup pageName="Links" style={styles} popupId="linksEdit" >
                    <LinksEditForm fillState={this.fillState} />
                </Popup>;
        }
        return (
            <div className="myContainer">
                <input type="button" onClick={this.props.click} className="btn btn-warning btnSwitch" value="Switch Colors" />
                <div className="myContainerHeader" id="myContainerHeader" style={headerStyles}>
                    <h1>Resources</h1>
                    {printablesEditBtn}
                    {downloadsEditBtn}
                    {linksEditBtn}
                </div>
                {printablesEditForm}
                {downloadsEditForm}
                {linksEditForm}
                <GenericBlock
                    noContent={true}
                    isPrintable={true}
                    list={this.state.printList}
                    heading={this.state.printTitle}
                    styles={styles}
                />
                <GenericBlock
                    noContent={true}
                    isLinks={true}
                    list={this.state.linkList}
                    heading={this.state.linkTitle}
                    styles={styles}
                />
                <GenericBlock
                    noContent={true}
                    isDownloadable={true}
                    list={this.state.downloadList}
                    heading={this.state.downloadTitle}
                    styles={styles}
                />
      </div>
    );
  }
}
