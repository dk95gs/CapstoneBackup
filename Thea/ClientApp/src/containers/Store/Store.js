import React, { Component } from 'react';
import GenericBlock from '../../components/GenericBlock/GenericBlock';
import axios from 'axios';
import './Store.css';

export class Store extends Component {
    displayName = Store.name;
    constructor(props) {
        super(props);
    }
    state = {
        heading: '',
        description: [],
        purchaseInfoHeading: '',
        purchaseInfo: []
    };
    componentDidMount() {
        axios.get(window.location.origin + "/api/storepage").then(response => {
            this.setState({
                heading: response.data.heading,
                description: JSON.parse(response.data.description),
                purchaseInfoHeading: response.data.purchaseInfoHeading,
                purchaseInfo: JSON.parse(response.data.purchaseInfo)
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
                    <h1>Store</h1>
                </div>
                <GenericBlock
                    heading={this.state.heading}
                    content={this.state.description}
                    styles={styles}
                />
                <GenericBlock
                    heading={this.state.purchaseInfoHeading}
                    content={this.state.purchaseInfo}
                    styles={styles}
                />
      </div>
    );
  }
}
