import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './containers/Layout/Layout';
import { Home } from './containers/Home/Home';

export default class App extends Component {
    displayName = App.name;
    state = {
        fontColor: '#000',
        bgColor: '#fff'
    };
    switchFontColorHandler = () => {
        
        const navFilter = document.getElementById("nav").style.filter;
        if (this.state.fontColor == "#000" && navFilter == "" && this.state.bgColor == "#fff") {
            this.setState({
                fontColor: "#fff",
                bgColor: "#000"
            });
            console.log("fired");
            document.getElementById("nav").style.filter = "invert(100%)";
            document.getElementById("headerMain").style.backgroundImage = "linear-gradient(#0F2027, #203A43,#2C5364)";
            document.getElementById("headerMain").style.color = "#fff";
            
        } else {
            this.setState({
                fontColor: "#000",
                bgColor: "#fff"
            });
            console.log("fire2d");
            document.getElementById("nav").style.filter = ""; 
            document.getElementById("headerMain").style.backgroundImage = "linear-gradient(#2980B9, #6DD5FA, #FFFFFF)";
            document.getElementById("headerMain").style.color = "#000";
        }
        
    }
  render() {
    return (
        <Layout>
            <Route exact path='/' render={() => <Home bgColor={this.state.bgColor} fontColor={this.state.fontColor} click={this.switchFontColorHandler} />} />
      </Layout>
    );
  }
}
