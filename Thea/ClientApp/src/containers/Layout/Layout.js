import React, { Component } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './Layout.css';

export class Layout extends Component {
    displayName = Layout.name
    state = {
        fontSize: 100,
        headerStyles: {}
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
    render() {
        var style = {
            fontSize: this.state.fontSize + "%"
        };
      return (
          <div>                   
              <Header />
              <div className="settings text-center">
                  <h5>Change Font Size</h5>
                  <input className="btn btn-primary" type="button" value="Increase" onClick={this.increaseFontSizeHandler} />
                  <input className="btn btn-secondary" type="button" value="Decrease" onClick={this.decreaseFontSizeHandler} />
              </div>
              <div className="container-fluid text-center" style={style}>
                  <Navbar />
                  {this.props.children}
              </div> 
              <Footer />
          </div>
    );
  }
}
