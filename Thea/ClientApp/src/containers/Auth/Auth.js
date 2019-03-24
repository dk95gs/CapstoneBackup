﻿import React, { Component } from 'react';
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
                this.setState({ errorMessage: resp });
            } else {
                this.setState({
                    errorMessage: "",
                    userName: "",
                    password: ""
                });
            }
        });
    }
    
    render() {
        if (!this.props.checkIfLoggedIn()) {
            return (
                <div style={this.props.style}>
                    <div className="row">
                        <div className="col-12">
                            <span style={{ color: 'red' }}> {this.state.errorMessage} </span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6 text-right">
                            <label> User Name: </label>
                            <input type="text" value={this.state.userName} onChange={this.handleUserName} />
                        </div>
                        <div className="col-6 text-left">
                            <label> Password: </label>
                            <input type="password" value={this.state.password} onChange={this.handlePassword} />
                        </div>
                    </div>
                    <div className="row text-center">
                        <div className="col-12">
                            <input type="button" className="btn btn-primary" value="Login" onClick={this.handleLogin} />
                        </div>
                    </div>

                </div>
            );
        } else {
            return (
                <div>
                    <div className="row text-center">
                        <div className="col-12">
                            <input type="button" className="btn btn-danger" value="Logout" onClick={this.props.logout} />
                        </div>
                    </div>
                </div>
                );
        }
    }
}