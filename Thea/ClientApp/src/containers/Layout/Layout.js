import React, { Component } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { Auth } from '../../containers/Auth/Auth';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import axios from 'axios';
import './Layout.css';

export class Layout extends Component {
    displayName = Layout.name
    state = {
        fontSize: 100,
        headerStyles: {},
        contactInfo: {}
    };

    increaseFontSizeHandler = () => {
        var changedFontSize = this.state.fontSize + 10;
        this.setState({
            fontSize: changedFontSize
        });
    };

    decreaseFontSizeHandler = () => {
        var changedFontSize = this.state.fontSize - 10;
        this.setState({
            fontSize: changedFontSize
        });
    };
    componentDidMount() {
        axios.get(window.location.origin + "/api/contactinfo").then(response => {
            this.setState({
                contactInfo: response.data
            });
        });
    }
    render() {
        var style = {
            fontSize: this.state.fontSize + "%"
        };
        return (
          <div>                   
                <Header
                    header={this.state.contactInfo.headerHeading}
                    subHeading={this.state.contactInfo.headerSubHeading}/>
              <div className="settings text-center">
                  <h5>Change Font Size</h5>
                  <input className="btn btn-primary" type="button" value="Increase" onClick={this.increaseFontSizeHandler} />
                  <input className="btn btn-secondary" type="button" value="Decrease" onClick={this.decreaseFontSizeHandler} />
              </div>
              <div className="container-fluid text-center" style={style}>
                  <Navbar />
                  {this.props.children}
              </div> 
                <Footer
                    streetName={this.state.contactInfo.streetName}
                    city={this.state.contactInfo.city}
                    province={this.state.contactInfo.province}
                    country={this.state.contactInfo.country}
                    postalCode={this.state.contactInfo.postalCode}
                    localNumber={this.state.contactInfo.localNumber}
                    tollFreeNumber={this.state.contactInfo.tollFreeNumber}
                    email={this.state.contactInfo.email}
                    footerMessage={this.state.contactInfo.footerMessage}
                    styles={style} >
                    <Auth
                        style={style}
                        loginUser={this.props.loginUser}
                        checkIfLoggedIn={this.props.checkIfLoggedIn}
                        logout={this.props.logout}/>
                </Footer>
                
          </div>
    );
  }
}
