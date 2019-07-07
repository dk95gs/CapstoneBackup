import React, { Component } from 'react';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import { Link } from 'react-router-dom';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './CheckeredEyesEditForm.css';

export class CheckeredEyesEditForm extends Component {
    displayName = CheckeredEyesEditForm.name;
    constructor(props) {
        super(props);
        this.state = {
            id:1,
            symbolUseBlockTitle: '',
            symbolUseBlockDescription: [],
            symbolUseQAList: [],
            attentionLowVissionBlockTitle: '',
            attentionLowVisionBlockContent: [],
            attentionSightedBlockTitle: '',
            attentionSightedBlockContent: [],
            question: '',
            answer:''
        }
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.resetForm = this.resetForm.bind(this);
        this.handleSymbolUseBlockTitleChange = this.handleSymbolUseBlockTitleChange.bind(this);
        this.handleSymbolUseBlockContentChange = this.handleSymbolUseBlockContentChange.bind(this);
        this.handleNewQuestionChange = this.handleNewQuestionChange.bind(this);
        this.handleNewAnswerChange = this.handleNewAnswerChange.bind(this);
        this.handleAttentionLowVissionBlockTitleChange = this.handleAttentionLowVissionBlockTitleChange.bind(this);
        this.handleLowVisionBlockContentChange = this.handleLowVisionBlockContentChange.bind(this);
        this.handleSightedBlockContentChange = this.handleSightedBlockContentChange.bind(this);
        this.handleAttentionSightedBlockTitleChange = this.handleAttentionSightedBlockTitleChange.bind(this);


    }
    fillState() {
        axios.get(window.location.origin + "/api/checkeredeyespage").then(response => {
            const data = response.data;
            this.setState({
                id: data.id,
                symbolUseBlockTitle: data.symbolUseBlockTitle,
                symbolUseBlockDescription: JSON.parse(data.symbolUseBlockDescription),
                symbolUseQAList: JSON.parse(data.symbolUseQAList),
                attentionLowVissionBlockTitle: data.attentionLowVissionBlockTitle,
                attentionLowVisionBlockContent: JSON.parse(data.attentionLowVisionBlockContent),
                attentionSightedBlockTitle: data.attentionSightedBlockTitle,
                attentionSightedBlockContent: JSON.parse(data.attentionSightedBlockContent)
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
            symbolUseBlockTitle: this.state.symbolUseBlockTitle,
            symbolUseBlockDescription: JSON.stringify(this.state.symbolUseBlockDescription),
            symbolUseQAList: JSON.stringify(this.state.symbolUseQAList),
            attentionLowVissionBlockTitle: this.state.attentionLowVissionBlockTitle,
            attentionLowVisionBlockContent: JSON.stringify(this.state.attentionLowVisionBlockContent),
            attentionSightedBlockTitle: this.state.attentionSightedBlockTitle,
            attentionSightedBlockContent: JSON.stringify(this.state.attentionSightedBlockContent),
        };
        let headers = {
            headers: {
                Authorization: "bearer " + sessionStorage.getItem("token")
            }
        };
        axios.post(window.location.origin + "/api/checkeredeyespage", payload, headers).then(resp => {
            this.props.fillState();
            document.getElementById("popup-container").scrollTop = 0;
            window.location.hash = "#root";
        });
        
    }
    deleteQA = (index, event) => {
        event.preventDefault();
        let tempFaq = [...this.state.symbolUseQAList];
        tempFaq.splice(index, 1);
        this.setState({
            symbolUseQAList: tempFaq
        });

    }
    addNewQA = (event) => {
        event.preventDefault();
        let tempFaq = [...this.state.symbolUseQAList];
        tempFaq.push({
            question: this.state.question,
            answer: this.state.answer.split("\n")
        });
        this.setState({
            symbolUseQAList: tempFaq,
            question: '',
            answer: ''
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
    handleSymbolUseBlockTitleChange(event) {
        this.setState({
            symbolUseBlockTitle: event.target.value
        });
    }
    handleSymbolUseBlockContentChange(event) {
        this.setState({
            symbolUseBlockDescription: event.target.value.split("\n")
        });
    }
    handleAttentionLowVissionBlockTitleChange(event) {
        this.setState({
            attentionLowVissionBlockTitle: event.target.value
        });
    }
    handleLowVisionBlockContentChange(event) {
        this.setState({
            attentionLowVisionBlockContent: event.target.value.split("\n")
        });
    }
    handleAttentionSightedBlockTitleChange(event) {
        this.setState({
            attentionSightedBlockTitle: event.target.value
        });
    }
    handleSightedBlockContentChange(event) {
        this.setState({
            attentionSightedBlockContent: event.target.value.split("\n")
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
    handleFaqBlockContentChange(index, type, event) {
        let tempFaq = [...this.state.symbolUseQAList];
        if (type === "question") {
            tempFaq[index] = {
                question: event.target.value,
                answer: tempFaq[index].answer
            }
            this.setState({
                symbolUseQAList: tempFaq
            });
        }
        if (type === "answer") {
            tempFaq[index] = {
                question: tempFaq[index].question,
                answer: event.target.value.split("\n")
            }
            this.setState({
                symbolUseQAList: tempFaq
            });
        }
    }
    componentDidMount() {
        this.fillState();
    }
    render() {
        let useBlockDescriptionString = null;
        let lowVisionBlockContent = null;
        let sightedBlockContent = null;
        let faqContent = [];
        if (this.state.symbolUseBlockDescription !== null) {
            useBlockDescriptionString = this.state.symbolUseBlockDescription.join("\n");
        }
        if (this.state.attentionLowVisionBlockContent !== null) {
            lowVisionBlockContent = this.state.attentionLowVisionBlockContent.join("\n");
        }
        if (this.state.attentionSightedBlockContent !== null) {
            sightedBlockContent = this.state.attentionSightedBlockContent.join("\n");
        }
        try {
            this.state.symbolUseQAList.map((qa, index) => {
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
                return true;
            });
        } catch (e) {
            console.log("faqContent that was passed was either null or the inccorect type");
        }
        return (
            <div>
                <Link
                    to='/checkeredeyes#root'
                    onClick={this.resetForm}
                    className="popup-close">&times;</Link>
                <form>
                    <div className="form-group">
                        <label> Symbol Use Block Title</label>
                        <input value={this.state.symbolUseBlockTitle} onChange={this.handleSymbolUseBlockTitleChange} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label> Symbol Use Description</label>
                        <textarea value={useBlockDescriptionString} onChange={this.handleSymbolUseBlockContentChange} rows="7" className="form-control"></textarea>
                    </div>
                    <h4>Symbol Use FAQ</h4>
                    {faqContent}
                    <h4> Add New Q & A </h4>
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
                    <div className="form-group">
                        <label> Low Vision Block Title </label>
                        <input value={this.state.attentionLowVissionBlockTitle} onChange={this.handleAttentionLowVissionBlockTitleChange} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label> Low Vision Block Content</label>
                        <textarea value={lowVisionBlockContent} onChange={this.handleLowVisionBlockContentChange} rows="7" className="form-control"></textarea>
                    </div>
                    <div className="form-group">
                        <label> Sighted People Block Title </label>
                        <input value={this.state.attentionSightedBlockTitle} onChange={this.handleAttentionSightedBlockTitleChange} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label> Low Vision Block Content</label>
                        <textarea value={sightedBlockContent} onChange={this.handleSightedBlockContentChange} rows="7" className="form-control"></textarea>
                    </div>
                    <Link
                        to='/checkeredeyes#checkeredeyesEdit'
                        onClick={this.handleFormSubmit}
                        className="btn btn-primary">Save Changes </Link>

                    <Link
                        to='/checkeredeyes#root'
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