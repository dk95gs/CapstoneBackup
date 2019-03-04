import React, { Component } from 'react';
import GenericBlock from '../../components/GenericBlock/GenericBlock';
import axios from 'axios';
import './Resources.css';

export class Resources extends Component {
    displayName = Resources.name;
    state = {
        linkList: [],
        linkTitle: "Links",
        printList: [],
        printTitle: "Printables",
        downloadList: [],
        downloadTitle: "Downloads"
    }
    componentDidMount() {
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
                    <h1>Resources</h1>
                </div>
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
