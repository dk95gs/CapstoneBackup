import React, { Component } from 'react';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import { Link } from 'react-router-dom';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './LinksEditForm.css';

export class LinksEditForm extends Component {
    displayName = LinksEditForm.name;
    constructor(props) {
        super(props);
        this.state = {
            linkList: [],
            title: '',
            srcURL: '',
            showInputs: false,
            crudType: ''

        }
        this.handleEditLinkSubmit = this.handleEditLinkSubmit.bind(this);
        this.resetForm = this.resetForm.bind(this);

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleSrcUrlChange = this.handleSrcUrlChange.bind(this);
        this.handleAddLinkSubmit = this.handleAddLinkSubmit.bind(this);
        this.handleDeleteLinkSubmit = this.handleDeleteLinkSubmit.bind(this);
    }
    beginAdd = () => {
        this.setState({
            title: '',
            srcURL: '',
            showInputs: true,
            crudType: "Add"
        });
    }
    beginEdit = (index) => {
        this.setState({
            id: this.state.linkList[index].id,
            title: this.state.linkList[index].title,
            srcURL: this.state.linkList[index].srcURL,
            showInputs: true,
            crudType: "Edit"
        });
    }
    cancelAddEdit = () => {
        this.setState({
            id: 0,
            title: '',
            srcURL: '',
            showInputs: false,
            crudType: ""
        })
    }
    fillState() {
        axios.get(window.location.origin + "/api/links").then(response => {
            this.setState({
                linkList: response.data
            });
        });
    }
    resetForm() {
        this.fillState();
        document.getElementById("popup-container").scrollTop = 0;
        window.location.hash = "#root";
    }
    saveData() {
        let payload = {
        };
        axios.post(window.location.origin + "/api/about", payload).then(resp => {
            this.props.fillState();
            document.getElementById("popup-container").scrollTop = 0;
            window.location.hash = "#root";
        });   
    }
    addData() {
        let body = {
            title: this.state.title,
            srcURL: this.state.srcURL
        }
        let headers = {
            headers: {
                Authorization: "bearer " + sessionStorage.getItem("token")
            }
        };
        axios.post(window.location.origin + "/api/links", body, headers).then(resp => {
            this.props.fillState();
            this.fillState();
            this.setState({
                showInputs: false,
                title: '',
                srcURL: '',
                crudType: ''
            });
        });
    }
    editData() {
        let body = {
            id: this.state.id,
            title: this.state.title,
            srcURL: this.state.srcURL
        }
        let headers = {
            headers: {
                Authorization: "bearer " + sessionStorage.getItem("token")
            }
        };
        axios.put(window.location.origin + "/api/links/" + this.state.id, body, headers).then(resp => {
            document.getElementById("popup-container").scrollTop = 0;
            this.setState({
                showInputs: false,
                title: '',
                file: null,
                crudType: ''
            });
            this.props.fillState();
            this.fillState();
        });
    }
    deleteData(id) {
        let headers = {
            headers: {
                Authorization: "bearer " + sessionStorage.getItem("token")
            }
        };
        axios.delete(window.location.origin + "/api/links/" + id, headers).then(resp => {
            this.props.fillState();
            this.fillState();

        });
    }
    handleTitleChange(event) {
        this.setState({
            title: event.target.value
        });
    }
    handleSrcUrlChange(event) {
        this.setState({
            srcURL: event.target.value
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
    componentDidMount() {
        this.fillState();
    }
    render() {
        let tableRows = [];
        let inputFields = null;
        let buttons = null;
        this.state.linkList.map((tr, index) => {
            tableRows.push(
                <tr key={index}>
                    <td>{tr.title}</td>
                    <td>{tr.srcURL}</td>
                    <td><input type="button" className="btn btn-warning" onClick={() => { this.beginEdit(index) }} value="Edit" /></td>
                    <td><input type="button" className="btn btn-danger" onClick={(e) => { this.handleDeleteLinkSubmit(tr.id, e) }} value="Delete" /></td>
                </tr>
            );
            return true;
        });
        if (this.state.showInputs) {
            inputFields =
            <div>
                <div className="form-group">
                    <label> Display Text </label>
                    <input value={this.state.title} onChange={this.handleTitleChange} className="form-control" />
                </div>
                <div className="form-group">
                    <label> Upload a PDF or word document</label>
                    <input value={this.state.srcURL} onChange={this.handleSrcUrlChange} className="form-control" className="form-control" />
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
                    to='/resources#root'
                    onClick={this.resetForm}
                    className="popup-close">&times;</Link>
                <input type="button" className="btn btn-primary" onClick={this.beginAdd} value="Add New" />
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Link URL</th>
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
                        to='/resources#root'
                        onClick={this.resetForm}
                        className="btn btn-secondary"
                        style={{ marginLeft: "1rem" }}>
                        Finish Making Changes
                    </Link>
                </form>
            </div>
    );
  }
}