import React, { Component } from 'react';
import GenericBlock from '../../components/GenericBlock/GenericBlock';
import { StoreEditForm } from './StoreEditForm/StoreEditForm';
import { AddItemForm } from './AddItemForm/AddItemForm';
import { EditItemForm } from './EditItemForm/EditItemForm';
import Popup from '../../components/Popup/Popup';
import { clearUrlHash } from '../../Helper';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import ShopItem from '../../components/ShopItem/ShopItem';
import axios from 'axios';
import './Store.css';

export class Store extends Component {
    displayName = Store.name;
    constructor(props) {
        super(props);
        this.state = {
            heading: '',
            description: [],
            purchaseInfoHeading: '',
            purchaseInfo: [],
            storeItems: [],
            name: '',
            imageUrl: '',
            description: [],
            id: 0,
            code: '',
            file: null
        };
        clearUrlHash();

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleCodeChange = this.handleCodeChange.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleDeleteConfirm = this.handleDeleteConfirm.bind(this);
    }
    saveData() {
        let headers = {
            headers: {
                Authorization: "bearer " + sessionStorage.getItem("token")
            }
        };
        let fd = new FormData();
        fd.append('id', this.state.id);
        fd.append('name', this.state.name);
        fd.append('description', JSON.stringify(this.state.description));
        fd.append('code', this.state.code);
        fd.append('imageURL', this.state.imageUrl);
        if (this.state.file !== null) {
            fd.append('file', this.state.file, this.state.file.name);
        }
        axios.put(window.location.origin + "/api/shopitems/" + this.state.id, fd, headers).then(response => {
            this.fillState();
            document.getElementById("popup-container").scrollTop = 0;
            window.location.hash = "#root";
        });
    }
    deleteItem(id) {
        let headers = {
            headers: {
                Authorization: "bearer " + sessionStorage.getItem("token")
            }
        };
        axios.delete(window.location.origin + "/api/shopitems/" + id, headers).then(resp => {
            this.fillState();
            window.location.hash = "#root";
        });
    }
    handleFormSubmit = (event) => {
        event.preventDefault();
        confirmAlert({
            title: 'Confirm to Save Changes',
            message: 'Are you sure you want to save these changes?.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => this.saveData()
                },
                {
                    label: 'No',
                    onClick: () => { }
                }
            ]
        });
    }
    handleDeleteConfirm = (id) => {
        confirmAlert({
            title: 'Confirm to Delete',
            message: 'Are you sure you want to delete?.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => this.deleteItem(id)
                },
                {
                    label: 'No',
                    onClick: () => { }
                }
            ]
        });
    }
    handleNameChange = (event) => {
        this.setState({
            name: event.target.value
        });
    }
    handleDescriptionChange = (event) => {
        this.setState({
            description: event.target.value.split("\n")
        });
    }
    handleCodeChange = (event) => {
        this.setState({
            code: event.target.value
        });
    }
    handleFileChange = (event) => {
        this.setState({
            file: event.target.files[0]
        });
    }
    fillState = () => {
        axios.get(window.location.origin + "/api/storepage").then(response => {
            this.setState({
                heading: response.data.heading,
                description: JSON.parse(response.data.description),
                purchaseInfoHeading: response.data.purchaseInfoHeading,
                purchaseInfo: JSON.parse(response.data.purchaseInfo)
            });
            axios.get(window.location.origin + "/api/shopitems").then(response => {
                this.setState({
                    storeItems: response.data
                });
                console.log(this.state.storeItems);
            });
        });
        
    }
    setupEditForm = (id) => {
        axios.get(window.location.origin + '/api/shopitems/' + id).then(response => {
            this.setState({
                id: response.data.id,
                name: response.data.name,
                description: JSON.parse(response.data.description),
                imageUrl: response.data.imageUrl,
                code: response.data.code
            });
        });
        window.location.hash = '#storeItemEdit';
    }
    componentDidMount() {
        this.fillState();

    }
    render() {
       const styles = {
            color: this.props.fontColor,
            backgroundColor: this.props.bgColor
        };
        const headerStyles = {
            filter: localStorage.getItem("headerFilter")
        };
        let editButton = null;
        let editForm = null;
        let addShopItemForm = null;
        let editShopItemForm = null;

        let addShopItemBtn = null;
        let storeItems = [];

        if (this.props.checkIfLoggedIn()) {
            editButton =
                <div className="editButtonContainer">
                    <Link
                        to='/store#storeEdit'
                        onClick={() =>
                            window.location.hash = '#storeEdit'
                        }
                        className="btn btn-secondary"
                    >Edit Page </Link>
                </div>;
            addShopItemBtn =
                <div className="editButtonContainer">
                    <Link
                        to='/store#storeItemAdd'
                        onClick={() =>
                            window.location.hash = '#storeItemAdd'
                        }
                        className="btn btn-secondary"
                    >Add New Shop Item </Link>
                </div>;
                
            editForm =
                <Popup pageName="Store Page" style={styles} popupId="storeEdit" >
                    <StoreEditForm fillState={this.fillState} />
                </Popup>;
            addShopItemForm =
                <Popup pageName="Add Item" style={styles} popupId="storeItemAdd" >
                    <AddItemForm fillState={this.fillState} />
                </Popup>;
            editShopItemForm = 
                <Popup pageName="Edit Item" style={styles} popupId="storeItemEdit" >
                <EditItemForm
                    fillState={this.fillState}
                    name={this.state.name}
                    description={this.state.description}
                    imageUrl={this.state.imageUrl}
                    code={this.state.code}
                    id={this.state.id}
                    handleNameChange={this.handleNameChange}
                    handleDescriptionChange={this.handleDescriptionChange}
                    handleCodeChange={this.handleCodeChange}
                    handleFileChange={this.handleFileChange}
                    handleFormSubmit={this.handleFormSubmit}
                />
                </Popup>;
        }
        
        this.state.storeItems.map((item, index) => {
            let shopItemsEditBtn = null;
            let shopItemsDeleteBtn = null;
            if (this.props.checkIfLoggedIn()) {
                shopItemsEditBtn =
                    <div className="editButtonContainer">
                        <Link
                            to='/store#storeItemEdit'
                            onClick={() =>
                                this.setupEditForm(item.id)
                            }
                            className="btn btn-secondary"
                        >Edit</Link>
                    </div>;
                shopItemsDeleteBtn = 
                    <div className="editButtonContainer">
                    <input type="button" className="btn btn-danger" value="Delete" onClick={() => { this.handleDeleteConfirm(item.id) }} />
                </div>
            }
            storeItems.push(
                <ShopItem
                    name={item.name}
                    description={JSON.parse(item.description)}
                    imgUrl={item.imageURL}
                    code={item.code}>
                    <div className="btn-group">
                        {shopItemsEditBtn}
                        {shopItemsDeleteBtn}
                    </div>
                </ShopItem>
            );
        });
        return (
            <div className="myContainer">
                <input type="button" onClick={this.props.click} className="btn btn-warning btnSwitch" value="Switch Colors" />
                <div className="myContainerHeader" id="myContainerHeader" style={headerStyles}>
                    <h1>Store</h1>
                    {editButton}
                    {addShopItemBtn}
                </div>
                {editForm}
                {addShopItemForm}
                {editShopItemForm}
                <GenericBlock
                    heading={this.state.heading}
                    content={this.state.description}
                    styles={styles}
                />
                <div className="text-center shopContainer">
                {storeItems}
                </div>
                <GenericBlock
                    heading={this.state.purchaseInfoHeading}
                    content={this.state.purchaseInfo}
                    styles={styles}
                />
      </div>
    );
  }
}
