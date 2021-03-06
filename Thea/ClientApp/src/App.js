import React, { Component } from 'react';
import axios from 'axios';
import { Route } from 'react-router';
import { Layout } from './containers/Layout/Layout';
import { Home } from './containers/Home/Home';
import { About } from './containers/About/About';
import { CheckeredEyes } from './containers/CheckeredEyes/CheckeredEyes';
import { Store } from './containers/Store/Store';
import { Resources } from './containers/Resources/Resources';
import { Social } from './containers/Social/Social';
import { Blogs} from './containers/Blogs/Blogs';

export default class App extends Component {
    displayName = App.name;
    state = {
        fontColor: '#000',
        bgColor: '#fff',
        twitterTheme: "light",
        isLoggedIn: false
    };
    switchFontColorHandler = () => {
        
        const navFilter = document.getElementById("nav").style.filter;
        if (this.state.fontColor === "#000" && navFilter === "" && this.state.bgColor === "#fff") {
            this.setState({
                fontColor: "#fff",
                bgColor: "#000",
                twitterTheme:"dark"
            });
            console.log("fired");
            document.getElementById("nav").style.filter = "invert(100%)";
            document.getElementById("myContainerHeader").style.filter = "invert(100%)";
            localStorage.setItem("headerFilter", "invert(100%)");
            document.getElementById("headerMain").style.backgroundImage = "linear-gradient(#0F2027, #203A43,#2C5364)";
            document.getElementById("footerMain").style.backgroundImage = "linear-gradient(#0F2027, #203A43,#2C5364)";
            document.getElementById("headerMain").style.color = "#fff";
            document.getElementById("footerMain").style.color = "#fff";
            
        }
        else {
            this.setState({
                fontColor: "#000",
                bgColor: "#fff",
                twitterTheme: "light"
            });
            document.getElementById("nav").style.filter = ""; 
            document.getElementById("myContainerHeader").style.filter = ""; 
            localStorage.setItem("headerFilter", "");
            document.getElementById("headerMain").style.backgroundImage = "linear-gradient(#2980B9, #6DD5FA, #FFFFFF)";
            document.getElementById("footerMain").style.backgroundImage = "linear-gradient(#ece7f5, #E9E4F0)";
            document.getElementById("headerMain").style.color = "#000";
            document.getElementById("footerMain").style.color = "#000";
        }
        
    }

    checkIfLoggedIn = () => {
        return this.state.isLoggedIn;
    }
    loginUser = (userName, password) => {
        let payload = {
            userName: userName,
            password: password
        }
        return axios.post(window.location.origin + "/api/appuser/login", payload).then((resp) => {
            sessionStorage.setItem("token", resp.data.token);
            this.setState({
                isLoggedIn: true
            });
            return true;
        }).catch(() => {
            return "Login/Password Incorrect";
        });
    }
    logout = () => {
        axios.post(window.location.origin + "/api/appuser/logout").then(response => {
            this.setState({
                isLoggedIn: false
            });
            sessionStorage.removeItem("token");
        });
    }
  render() {
    return (
        <Layout loginUser={this.loginUser} checkIfLoggedIn={this.checkIfLoggedIn} logout={this.logout} bgColor={this.state.bgColor}
            fontColor={this.state.fontColor}>
            <Route
                exact path='/'
                render={() =>
                    <Home
                        bgColor={this.state.bgColor}
                        fontColor={this.state.fontColor}
                        click={this.switchFontColorHandler}
                        loginUser={this.loginUser}
                        checkIfLoggedIn={this.checkIfLoggedIn}
                        logout={this.logout} />} />
            <Route
                exact path='/about'
                render={() =>
                    <About
                        bgColor={this.state.bgColor}
                        fontColor={this.state.fontColor} 
                        click={this.switchFontColorHandler}
                        loginUser={this.loginUser}
                        checkIfLoggedIn={this.checkIfLoggedIn}
                        logout={this.logout} />} />
            <Route
                exact path='/checkeredeyes'
                render={() =>
                    <CheckeredEyes
                        bgColor={this.state.bgColor}
                        fontColor={this.state.fontColor}
                        click={this.switchFontColorHandler}
                        loginUser={this.loginUser}
                        checkIfLoggedIn={this.checkIfLoggedIn}
                        logout={this.logout} />} />
            <Route
                exact path='/store'
                render={() =>
                    <Store
                        bgColor={this.state.bgColor}
                        fontColor={this.state.fontColor}
                        click={this.switchFontColorHandler}
                        loginUser={this.loginUser}
                        checkIfLoggedIn={this.checkIfLoggedIn}
                        logout={this.logout} />} />
            <Route
                exact path='/resources'
                render={() =>
                    <Resources
                        bgColor={this.state.bgColor}
                        fontColor={this.state.fontColor}
                        click={this.switchFontColorHandler}
                        loginUser={this.loginUser}
                        checkIfLoggedIn={this.checkIfLoggedIn}
                        logout={this.logout} />} />
            <Route
                exact path='/social'
                render={() =>
                    <Social
                        bgColor={this.state.bgColor}
                        fontColor={this.state.fontColor}
                        twitterTheme={this.state.twitterTheme}
                        click={this.switchFontColorHandler}
                        loginUser={this.loginUser}
                        checkIfLoggedIn={this.checkIfLoggedIn}
                        logout={this.logout} />} />
            <Route
                exact path='/blogs'
                render={() =>
                    <Blogs
                        bgColor={this.state.bgColor}
                        fontColor={this.state.fontColor}
                        twitterTheme={this.state.twitterTheme}
                        click={this.switchFontColorHandler}
                        loginUser={this.loginUser}
                        checkIfLoggedIn={this.checkIfLoggedIn}
                        logout={this.logout} />} />
      </Layout>
    );
  }
}
