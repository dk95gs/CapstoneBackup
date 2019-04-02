import React, { Component } from 'react';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import { Link } from 'react-router-dom';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './SocialEditForm.css';

export class SocialEditForm extends Component {
    displayName = SocialEditForm.name;
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            hrefUrl: '',
            imageUrl: '',
            socials: [],
            file: null,
            showInputs: false,
            crudType: ''
        }
        this.handleAddLinkSubmit = this.handleAddLinkSubmit.bind(this);
        this.resetForm = this.resetForm.bind(this);
        this.handleFileSelect = this.handleFileSelect.bind(this);
        this.handleHrefUrlChange = this.handleHrefUrlChange.bind(this);
        this.handleDeleteLinkSubmit = this.handleDeleteLinkSubmit.bind(this);
        this.handleEditLinkSubmit = this.handleEditLinkSubmit.bind(this);


    }
    beginEdit = (index) => {
        this.setState({
            id: this.state.socials[index].id,
            hrefUrl: this.state.socials[index].hrefUrl,
            imageUrl: this.state.socials[index].imageURL,
            showInputs: true,
            crudType: "Edit"
        });     
    }
    beginAdd = () => {
        this.setState({
            hrefUrl: '',
            imageUrl: '',
            showInputs: true,
            crudType: "Add"
        });
    }
    cancelAddEdit = () => {
        this.setState({
            hrefUrl: '',
            imageUrl: '',
            showInputs: false,
            crudType: ""
        })
    }
    addData() {
        let fd = new FormData();
        if (this.state.file !== null) {
            fd.append('file', this.state.file, this.state.file.name);
        }
        fd.append('hrefUrl', this.state.hrefUrl);
        let headers = {
            headers: {
                Authorization: "bearer " + sessionStorage.getItem("token")
            }
        };
        axios.post(window.location.origin + "/api/socialmedias", fd, headers).then(resp => {
            this.props.fillState();
            this.fillState();
            document.getElementById("popup-container").scrollTop = 0;
            this.setState({
                showInputs: false,
                hrefUrl: '',
                file: null,
                crudType: ''
            });
        });
    }
    editData() {
        let fd = new FormData();
        if (this.state.file !== null) {
            fd.append('file', this.state.file, this.state.file.name);
        }
        fd.append('hrefUrl', this.state.hrefUrl);
        fd.append('id', this.state.id);
        fd.append('imageURL', this.state.imageUrl);
        let headers = {
            headers: {
                Authorization: "bearer " + sessionStorage.getItem("token")
            }
        };
        axios.put(window.location.origin + "/api/socialmedias/" + this.state.id, fd, headers).then(resp => {
            document.getElementById("popup-container").scrollTop = 0;
            this.setState({
                showInputs: false,
                hrefUrl: '',
                file: null,
                crudType: ''
            });
            this.props.fillState();
            this.fillState();
        })
    }
    deleteData(id) {
        let headers = {
            headers: {
                Authorization: "bearer " + sessionStorage.getItem("token")
            }
        };
        axios.delete(window.location.origin + "/api/socialmedias/" + id, headers).then(resp => {
            console.log(resp);
            this.props.fillState();
            this.fillState();

        })
    }
    handleHrefUrlChange(event) {
        this.setState({
            hrefUrl: event.target.value
        });
    }
    handleFileSelect(event) {
        this.setState({
            file:event.target.files[0]
        });
    }
    handleAddLinkSubmit(event) {
        event.preventDefault();
        confirmAlert({
            title: 'Confirm to Save Changes',
            message: 'Are you sure you want to add this link?.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => this.addData()
                },
                {
                    label: 'No',
                    onClick: () => { }
                }
            ]
        });     
    }
    handleEditLinkSubmit(event) {
        event.preventDefault();
        confirmAlert({
            title: 'Confirm to Save Changes',
            message: 'Are you sure you want to save these changes?.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => this.editData()
                },
                {
                    label: 'No',
                    onClick: () => { }
                }
            ]
        });
    }
    handleDeleteLinkSubmit(id, event) {
        event.preventDefault();
        confirmAlert({
            title: 'Confirm Delete',
            message: 'Are you sure you want to delete this link?.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => this.deleteData(id)
                },
                {
                    label: 'No',
                    onClick: () => { }
                }
            ]
        });
    }
    fillState() {
        axios.get(window.location.origin + '/api/socialmedias').then(response => {
            this.setState({
                socials: response.data
            });
        })
    }
    resetForm() {
        this.fillState();
        document.getElementById("popup-container").scrollTop = 0;
        window.location.hash = "#root";
    }
    componentDidMount() {
        this.fillState();
    }
    render() {
        let tableRows = [];
        let inputFields = null;
        let buttons = null;
        this.state.socials.map((tr, index) => {
            tableRows.push(
                <tr key={index}>
                    <td>{tr.hrefUrl}</td>
                    <td> <img className="tableCellImg" src={window.location.origin + "\\" + tr.imageURL} /> </td>
                    <td><input type="button" className="btn btn-warning" onClick={() => { this.beginEdit(index) }} value="Edit" /></td>
                    <td><input type="button" className="btn btn-danger" onClick={(e) => { this.handleDeleteLinkSubmit(tr.id, e) }} value="Delete" /></td>
                </tr>
            );
        });
        if (this.state.showInputs) {
            inputFields =
            <div> 
                <div className="form-group">
                    <label> Link To Your Social Media Page </label>
                    <input value={this.state.hrefUrl} onChange={this.handleHrefUrlChange} className="form-control" />
                </div>
                <div className="form-group">
                    <label> Upload a New Picture or Leave Blank to Use Original</label>
                    <input  onChange={this.handleFileSelect} type="file" className="form-control" className="form-control" />
                </div>
            </div>
        }
        if (this.state.crudType === "Edit") {
            buttons =
                <div className="form-group">
                <input type="button" className="btn btn-primary" onClick={this.handleEditLinkSubmit} value="Save Changes" />
                <input type="button" className="btn btn-danger" onClick={this.cancelAddEdit} value="Cancel" />
            </div>
        }
        if (this.state.crudType === "Add") {
            buttons =
                <div className="form-group">
                <input type="button" className="btn btn-primary" onClick={this.handleAddLinkSubmit} value="Save Changes" />
                    <input type="button" className="btn btn-danger" onClick={this.cancelAddEdit} value="Cancel" />
                </div>
        }
        return (
            <div>
                <Link
                    to='/social#root'
                    onClick={this.resetForm}
                    className="popup-close">&times;</Link>

                <input type="button" className="btn btn-primary" onClick={this.beginAdd} value="Add New" />
                <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Url</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableRows}
                        </tbody>
                </table>
                <form>
                    <h2>  {this.state.crudType} </h2>
                    {inputFields}
                    {buttons}
                    <Link
                        to='/social#root'
                        onClick={this.resetForm}
                        className="btn btn-secondary"
                        style={{ marginLeft: "1rem" }}>
                        Done Making Changes
                    </Link>
                </form>
            </div>
    );
  }
}