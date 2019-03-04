import React, { Component } from 'react';
//import GenericBlock from '../../components/GenericBlock/GenericBlock';
//import axios from 'axios';
import './Store.css';

export class Store extends Component {
    displayName = Store.name;
    render() {
       /* const styles = {
            color: this.props.fontColor,
            backgroundColor: this.props.bgColor
        };*/
        const headerStyles = {
            filter: localStorage.getItem("headerFilter")
        };
        
        return (
            <div className="myContainer">
                <input type="button" onClick={this.props.click} className="btn btn-warning btnSwitch" value="Switch Colors" />
                <div className="myContainerHeader" id="myContainerHeader" style={headerStyles}>
                    <h1>Store</h1>
                </div>
      </div>
    );
  }
}
