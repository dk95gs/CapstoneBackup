import React, { Component } from 'react';
import { clearUrlHash } from '../../Helper';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Reports.css';

export class Reports extends Component {
    displayName = Reports.name;
    constructor(props) {
        super(props);
        this.state = {
            blogReport: [],
            shopItemsReport: []
        };
        clearUrlHash();
    }
    resetForm() {
        window.location.hash = "#root";
    }
    componentDidMount() {
        if (this.props.type === "blogs") {
            axios.get(window.location.origin + "/api/reports/BlogsReport").then((resp) => {
                this.setState({
                    blogReport: resp.data
                });
            });
        }
        if (this.props.type === "shopitems") {
            axios.get(window.location.origin + "/api/reports/StoreReport").then((resp) => {
                this.setState({
                    shopItemsReport: resp.data
                });
            });
        }
    }
    render() {
        const styles = {
            color: this.props.fontColor,
            backgroundColor: this.props.bgColor
        };
        let blogsReport = null;
        let shopItemsReport = null;
        if (this.props.type === "blogs") {
            let tableBody = [];
            if (this.state.blogReport !== null) {
                this.state.blogReport.map((b, index) => {
                    tableBody.push(
                        <tr key={index}>
                            <td>{b.title}</td>
                            <td>{b.author}</td>
                            <td>{b.postedDate}</td>
                        </tr>
                    );
                });
            }
            blogsReport =
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Posted Date</th>
                        </tr>
                </thead>
                    <tbody>
                        {tableBody}
                    </tbody>
                </table>;
        }
        if (this.props.type === "shopitems") {
            let tableBody = [];
            if (this.state.shopItemsReport !== null) {
                this.state.shopItemsReport.map((b, index) => {
                    let para = [];
                    let description = JSON.parse(b.description);
                    description.map((p, index) => {
                        para.push(
                            <p key={index}>{p}</p>
                        );
                    });
                    tableBody.push(
                        <tr key={index}>
                            <td>{b.name}</td>
                            <td>${b.price}</td>
                            <td>{para}</td>
                            
                        </tr>
                    );
                });
            }
            shopItemsReport =
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableBody}
                    </tbody>
                </table>;
        }
        return (
            <div>
                <Link
                    to='/#root'
                    onClick={this.resetForm}
                    className="popup-close">&times;</Link>
                {blogsReport}
                {shopItemsReport}
            </div>
    );
  }
}
