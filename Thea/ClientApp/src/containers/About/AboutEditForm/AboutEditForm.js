import React, { Component } from 'react';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import { Link } from 'react-router-dom';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './AboutEditForm.css';

export class AboutEditForm extends Component {
    displayName = AboutEditForm.name;
    constructor(props) {
        super(props);
        this.state = {
            id: 1,
            aboutHeading: '',
            aboutContent: '',
            ackTitle: '',
            ackSubTitle: '',
            ackContent: '',
            faqBlockQA: [],
            question: '',
            answer: ''
        }
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.resetForm = this.resetForm.bind(this);
        this.handleAboutHeadingChange = this.handleAboutHeadingChange.bind(this);
        this.handleFaqBlockContentChange = this.handleFaqBlockContentChange.bind(this);
        this.handleAboutContentChange = this.handleAboutContentChange.bind(this);
        this.handleAckTitleChange = this.handleAckTitleChange.bind(this);
        this.handleAckSubTitleChange = this.handleAckSubTitleChange.bind(this);
        this.handleAckContentChange = this.handleAckContentChange.bind(this);
        this.handleNewQuestionChange = this.handleNewQuestionChange.bind(this);
        this.handleNewAnswerChange = this.handleNewAnswerChange.bind(this);
        this.qaDeleteConfirmation = this.qaDeleteConfirmation.bind(this);


    }
    addNewQA = (event) => {
        event.preventDefault();
        let tempFaq = [...this.state.faqBlockQA];
        tempFaq.push({
            question: this.state.question,
            answer:  this.state.answer.split("\n")
        });
        this.setState({
            faqBlockQA: tempFaq,
            question: '',
            answer: ''
        });
    }
    deleteQA = (index, event) => {
        event.preventDefault();
        let tempFaq = [...this.state.faqBlockQA];
        tempFaq.splice(index, 1);
        this.setState({
            faqBlockQA: tempFaq
        });

    }
    qaDeleteConfirmation = (index, event) => {
        event.preventDefault();
        confirmAlert({
            title: 'Confirm Delete',
            message: 'Are you sure you want to delete this Q & A?.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => this.deleteQA(index, event)
                },
                {
                    label: 'No',
                    onClick: () => { }
                }
            ]
        });
    }
    fillState() {
        axios.get(window.location.origin + "/api/About").then(response => {
            const data = response.data;
            this.setState({
                id: data.id,
                aboutHeading: data.aboutBlockHeading,
                aboutContent: JSON.parse(data.aboutBlockContent),
                ackTitle: data.achnowledgementsBlockTitle,
                ackSubTitle: data.achnowledgementsBlockDescription,
                ackContent: JSON.parse(data.achnowledgementsBlockList),
                faqBlockQA: JSON.parse(data.faqBlockQA)
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
            id: this.state.id,
            aboutBlockHeading: this.state.aboutHeading,
            aboutBlockContent: JSON.stringify(this.state.aboutContent),
            achnowledgementsBlockTitle: this.state.ackTitle,
            achnowledgementsBlockDescription: this.state.ackSubTitle,
            achnowledgementsBlockList: JSON.stringify(this.state.ackContent),
            faqBlockQA: JSON.stringify(this.state.faqBlockQA)
        };
        console.log(payload);
        let headers = {
            headers: {
                Authorization: "bearer " + sessionStorage.getItem("token")
            }
        };
        axios.post(window.location.origin + "/api/about", payload, headers).then(resp => {
            this.props.fillState();
            document.getElementById("popup-container").scrollTop = 0;
            window.location.hash = "#root";
        });
        
    }

    handleFormSubmit(event) {
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
    handleAboutHeadingChange(event) {
        this.setState({
            aboutHeading: event.target.value
        });
    }
    handleAboutContentChange(event) {
        this.setState({
            aboutContent: event.target.value.split("\n")
        });
    }
    handleAckTitleChange(event) {
        this.setState({
            ackTitle: event.target.value
        });
    }
    handleAckSubTitleChange(event) {
        this.setState({
            ackSubTitle: event.target.value
        });
    }
    handleAckContentChange(event) {
        this.setState({
            ackContent: event.target.value.split("\n")
        });
    }
    handleNewQuestionChange(event) {
        this.setState({
            question: event.target.value
        });
    }
    handleNewAnswerChange(event) {
        this.setState({
            answer: event.target.value
        });
    }
    handleFaqBlockContentChange(index, type, event) {
        let tempFaq = [...this.state.faqBlockQA];
        if (type === "question") {
            tempFaq[index] = {
                question: event.target.value,
                answer: tempFaq[index].answer
            }
            this.setState({
                faqBlockQA: tempFaq
            });
        }
        if (type == "answer") {
            tempFaq[index] = {
                question: tempFaq[index].question,
                answer: event.target.value.split("\n")
            }
            this.setState({
                faqBlockQA: tempFaq
            });
        }
    }
    componentDidMount() {
        this.fillState();
    }
    render() {
        let faqContent = [];
        let aboutContentString = null;
        let ackContentString = null;
        try {
            aboutContentString = this.state.aboutContent.join("\n");
            ackContentString = this.state.ackContent.join("\n");
        } catch (e) {
            console.log("about content and/or achnowledgements content null or incorrect type");
        }
        try {
            this.state.faqBlockQA.map((qa, index) => {
                faqContent.push(
                    <div className="mycard" key={index}>
                        <button className="btn btn-danger" onClick={(e) => { this.qaDeleteConfirmation(index, e) }}> Delete </button>
                        <div className="form-group">
                            <label> Question </label>
                            <input value={qa.question} onChange={(e) => { this.handleFaqBlockContentChange(index, "question", e) }} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label> Answer</label>
                            <textarea value={qa.answer.join("\n")} onChange={(e) => { this.handleFaqBlockContentChange(index, "answer", e) }} rows="7" className="form-control"></textarea>
                        </div>
                    </div>);
            });
        } catch (e) {
            console.log("faqContent that was passed was either null or the inccorect type");
        }
        
        return (
            <div>
                <Link
                    to='/about#root'
                    onClick={this.resetForm}
                    className="popup-close">&times;</Link>
                <form>
                    <div className="form-group">
                        <label> About Us Block Heading</label>
                        <input value={this.state.aboutHeading} onChange={this.handleAboutHeadingChange} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label> About Us Block Content</label>
                        <textarea value={aboutContentString} onChange={this.handleAboutContentChange} rows="7" className="form-control"></textarea>
                    </div>
                    <div className="form-group">
                        <label> Achnowledgements Title</label>
                        <input value={this.state.ackTitle} onChange={this.handleAckTitleChange} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label> Achnowledgements Sub Title</label>
                        <input value={this.state.ackSubTitle} onChange={this.handleAckSubTitleChange} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label> Achnowledgements Content</label>
                        <textarea value={ackContentString} onChange={this.handleAckContentChange} rows="7" className="form-control"></textarea>
                    </div>
                    <h4>FAQ Block Content </h4>
                    {faqContent}
                    <h5> Add New Q & A </h5>
                    <div className="form-group">
                        <label> Question </label>
                        <input value={this.state.question} onChange={this.handleNewQuestionChange} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label> Answer </label>
                        <textarea value={this.state.answer} onChange={this.handleNewAnswerChange} rows="7" className="form-control"></textarea>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-warning" onClick={this.addNewQA} > Add New Question </button>
                    </div>
                    <Link
                        to='/about#aboutEdit'
                        onClick={this.handleFormSubmit}
                        className="btn btn-primary">Save Changes </Link>

                    <Link
                        to='/about#root'
                        onClick={this.resetForm}
                        className="btn btn-danger"
                        style={{ marginLeft: "1rem" }}>
                        Cancel
                    </Link>
                </form>
            </div>
    );
  }
}