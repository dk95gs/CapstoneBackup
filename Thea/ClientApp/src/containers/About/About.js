import React, { Component } from 'react';
import GenericBlock from '../../components/GenericBlock/GenericBlock';
export class About extends Component {
    displayName = About.name;
    state = {
        aboutHeading: 'The Checkered Eye Project (CEP)',
        aboutContent: ['The Checkered Eye Project (CEP) was founded in 2000 by Libby Thaw, a stay at home mother in Port Elgin, Ontario. Living with low vision herself, Thaw noticed an unmet need for a hands free identifier that could also be discreet if need be. ',
            'When support for the necessary awareness effort was declined by service agencies for the blind in Canada, Thaw decided to go ahead on her own. ',
            'Funding for the project is provided by Thaw, with a small income coming from the sale of checkered eyes. Having considered registration as a charity or not-for-profit-organization, Thaw determined that it would complicate procedures more than add to the awareness efforts. Therefore, the CEP is registered as a business. ',
            'While a few retail stores offer checkered eyes, many of the "outlets" are people who wanted to help and make checkered eyes available from their homes. ',
            'In cooperative awareness efforts taking place in The US, New Zealand, Switzerland, and most recently Thailand, the process is largely in the hands of people with low vision. Significant collaboration with chapters of the Rotary Club has also boosted our efforts. ',
            'Hoping to enlist chambers of commerce and eye care specialists, the CEP is slowly gaining awareness and partners in the education process.'],
        ackTitle: 'Acknowledgements',
        ackSubTitle: 'The Checkered Eye Project would like to gratefully acknowledge the following organizations for their cooperative participation in our awareness efforts. ',
        ackContent: ['The Rotary Club of Port Elgin and Charitable Trust', 'AMI (Accessible Media Inc.)',
            'The Alliance for Equality of Blind Canadians (AEBC)', 'Grey Bruce Health Services', 'The Rotary Club of Ambridge, PA',
            'Corporate Plus Marketing & Promotions Inc.', 'CI360 Continuous Improvement Consulting', 'The Toronto Transit Commission',
        'The Rotary Club of Port Elgin and Charitable Trust']
    }
    render() {
        
        const styles = {
            color: this.props.fontColor,
            backgroundColor: this.props.bgColor
        };
        return (
            <div className="myContainer">
                <input type="button" onClick={this.props.click} className="btn btn-warning btnSwitch" value="Switch Colors" />
                <div className="myContainerHeader" id="myContainerHeader">
                    <h1>About The Project</h1>
                </div>
                <GenericBlock
                    heading={this.state.aboutHeading}
                    content={this.state.aboutContent}
                    styles={styles}
                    isList={false} />
                <GenericBlock
                    heading={this.state.ackTitle}
                    subHeading={this.state.ackSubTitle}
                    content={this.state.ackContent}
                    styles={styles}
                    isList={true} />
            </div>
            );
    }
}