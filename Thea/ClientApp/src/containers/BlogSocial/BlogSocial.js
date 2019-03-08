import React, { Component } from 'react';
import { Timeline } from 'react-twitter-widgets'
import GenericBlock from '../../components/GenericBlock/GenericBlock';
import Socials from '../../components/Socials/Socials';
import Blog from '../../components/Blog/Blog';
import axios from 'axios';
import './BlogSocial.css';

export class BlogSocial extends Component {
    displayName = BlogSocial.name;
    state = {
        socials: [],
        content: [],
        author: '',
        title: '',
        postedDate: '',
        pictureSrcList: []
    };
    componentDidMount() {
        axios.get(window.location.origin + '/api/socialmedias').then(response => {
            this.setState({
                socials: response.data
            });
        })
        axios.get(window.location.origin + '/api/blogs').then(response => {
            this.setState({
                content: JSON.parse(response.data[0].content),
                title: response.data[0].title,
                author: response.data[0].author,
                postedDate: response.data[0].postedDate,
                pictureSrcList: JSON.parse(response.data[0].pictureSrcList)
            });
        })
    }
    render() {
        const styles = {
            color: this.props.fontColor,
            backgroundColor: this.props.bgColor
        };
        const headerStyles = {
            filter: localStorage.getItem("headerFilter")
        };
        
        return (
            <div className="myContainer">
                <input type="button" onClick={this.props.click} className="btn btn-warning btnSwitch" value="Switch Colors" />
                <div className="myContainerHeader" id="myContainerHeader" style={headerStyles}>
                    <h1>Blog & Socials</h1>
                </div>
                <GenericBlock
                    heading="Our Social Media "
                    styles={styles}
                    noContent={true}
                >
                    <Socials
                        socials={this.state.socials}
                        
                    />
                </GenericBlock>
                <GenericBlock 
                    noContent={true}
                    styles={styles} >                   
                    <Timeline
                        dataSource={{
                            sourceType: 'profile',
                            screenName: 'LibbyThaw'
                        }}
                        options={{
                            username: 'LibbyThaw',
                            height: '800',
                            theme: this.props.twitterTheme
                        }}
                        onLoad={() => console.log('Timeline is loaded!')}
                    />
                </GenericBlock>
                <GenericBlock
                    noContent={true}
                    heading="Blogs"
                    styles={styles}>
                    <Blog
                        content={this.state.content}
                        author={this.state.author}
                        title={this.state.title}
                        postedDate={this.state.postedDate}
                        pictureSrcList={this.state.pictureSrcList}
                    />
                </GenericBlock>
      </div>
    );
  }
}
