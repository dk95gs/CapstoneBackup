import React, { Component } from 'react';
import Popup from '../../components/Popup/Popup';
import { Reports } from '../Reports/Reports';
import { Link } from 'react-router-dom';
import './Auth.css';


export class Auth extends Component  {
    constructor(props) {
        super(props);
        this.state = {
            errorMessage: '',
            userName: '',
            password: ''
        }       
        this.handleUserName = this.handleUserName.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    } 
    
    handleUserName(event) {
        this.setState({
            userName:event.target.value
        });
    }
    handlePassword(event) {
        this.setState({
            password: event.target.value
        });
    }
    handleLogin() {
        let loginPromise = this.props.loginUser(this.state.userName, this.state.password);
        loginPromise.then(resp => {
            if (resp !== true) {
                this.setState({
                    errorMessage: ''
                });
                this.setState({
                    errorMessage: <span className="errorMessage"> {resp} </span>
                });
            } else {
                this.setState({
                    errorMessage: "",
                    userName: "",
                    password: ""
                });
            }
        });
    }
    clickLoginButton(e) {
        if (e.key === 'Enter') {
            document.getElementById("loginBtn").click();
        }
    }
    render() {
        if (!this.props.checkIfLoggedIn()) {
            return (
                <div style={this.props.style}>
                    <div className="row">
                        <div className="col-12">
                            {this.state.errorMessage}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6 text-right">
                            <label> User Name: </label>
                            <input type="text" value={this.state.userName} onChange={this.handleUserName} />
                        </div>
                        <div className="col-6 text-left">
                            <label> Password: </label>
                            <input type="password" value={this.state.password} onChange={this.handlePassword} onKeyPress={this.clickLoginButton} />
                        </div>
                    </div>
                    <div className="row text-center">
                        <div className="col-12">
                            <input type="button" className="btn btn-primary" id="loginBtn" value="Login" onClick={this.handleLogin} />
                        </div>
                    </div>

                </div>
            );
        } else {
            const styles = {
                color: this.props.fontColor,
                backgroundColor: this.props.bgColor
            };
            let blogReport = 
                <Popup pageName="Monthly Blogs Report" style={styles} popupId="blogsReport" >
                    <Reports type="blogs" />
                </Popup>;
                
            let shopItemReport = 
                <Popup pageName="Monthly Shop Items Report" style={styles} popupId="shopItemsReport" >
                    <Reports type="shopitems" />
                </Popup>;;

            let blogReportBtn = 
                <div className="editButtonContainer">
                    <Link
                        to='/#blogsReport'
                        onClick={() =>
                            window.location.hash = '#blogsReport'
                        }
                        className="btn btn-secondary"
                    >Blogs Report </Link>
                </div>;
            let shopItemReportBtn = 
                <div className="editButtonContainer">
                    <Link
                        to='/#shopItemsReport'
                        onClick={() =>
                            window.location.hash = '#shopItemsReport'
                        }
                        className="btn btn-secondary"
                    >Shop items Report </Link>
                </div>;
                ;

            return (
                
                <div>
                    <div className="row text-center">
                        <div className="col-12">
                            <div className="btn-group">
                                <input type="button" className="btn btn-danger" value="Logout" onClick={this.props.logout} />
                                {blogReportBtn}
                                {shopItemReportBtn}
                            </div>
                        </div>
                        {blogReport}
                        {shopItemReport}
                    </div>
                </div>
                );
        }
    }
}