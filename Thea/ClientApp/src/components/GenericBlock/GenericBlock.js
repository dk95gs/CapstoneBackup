import React from 'react';
import './GenericBlock.css';
const GenericBlock = (props) => {
    const content = props.content;
    const faqContent = props.faqContent;
    const list = props.list;

    let lstParaFAQContent = null;
    let faqDescription = null;
    let prtLinkDwnldContent = null;

    //Logic to fill faqDescription variable
    //Checks if both content and FAQ are being passed and renders the content
    if (props.hasContentAndFAQ === true) {
        try {
            faqDescription = content.map((p, i) => {
                return <p key={i}>{p}</p>
            });
        }
        catch (error) {
            console.log('%c No content was passed OR content that was passed is not an Array of Strings', 'background: #222; color: lightgreen');
        }
    }
    //Logic to fill lstParaFAQContent variable
    //Checks if FAQ content is being passed
    if (props.isFAQ !== true) {
        //Checks if there is no content
        if (props.noContent !== true) {
            //Checks if the content that was passed in should be rendered as a list
            if (props.isList === true) {
                try {
                    lstParaFAQContent =
                        <ul>
                            {
                            content.map((p, i) => {
                                if (p !== '') {
                                    return <li key={i}>{p}</li>
                                } else {
                                    return <p></p>
                                }
                                })
                            }
                        </ul>
                }
                catch (error) {
                    console.log('%c No content was passed OR content that was passed is not an Array of Strings', 'background: #222; color: lightgreen');
                }
            }
            //renders content as paragraphs
            else
            {
                try {
                    lstParaFAQContent = content.map((p, i) => {
                        return <p key={i}>{p}</p>
                    });
                }
                catch (error) {
                    console.log('%c No content was passed OR content that was passed is not an Array of Strings', 'background: #222; color: lightgreen');                  
                }
            }
        }
        //No content gets rendered
        else
        {
            //no content
        }
    }
    //FAQ content was passed in and it gets rendered
    else
    {
        try {
            lstParaFAQContent = faqContent.map((p, index) => {
                return <div key={index}>
                    <p style={{ fontWeight: "bold" }}>{index + 1 + ". "}{p.question}</p>
                    {p.answer.map((a, i) => {
                        return <p key={i}> {a} </p>
                    })}
                </div>
            });
        }
        catch (error) {
            console.log('%c No faqContent was passed OR faqContent passed was' +
                'the inccorect type - Must be an Array of Objects with question &' +
                ' answer property with the answer needing to be an Array of Strings[{ question: \'\', answer: [\'\']}]', 'background: #222; color: lightgreen');
        }

    }
    //Logic to fill prtLinkDwnldContent variable
    //Checks if the list should be rendered as links that redirect to an external site
    if (props.isLinks) {
        try {
            prtLinkDwnldContent =
                <ul>
                    {
                        list.map((l, index) => {
                            return <li key={index}> <a href={window.location.origin + "//" + l.srcURL} target="_blank"> {l.title}</a></li>
                        })
                    }
                </ul>
        }
        catch (error) {
            console.log('%c No list was pass OR incorrect type was passed in for list', 'background: #222; color: lightgreen');
        }
    }
    //Checks if the list should be rendered as links that open a file from the site(pdf, word doc, ect..)
    if (props.isPrintable) {
        try {
            prtLinkDwnldContent =
                <ul>
                    {
                        list.map((l, index) => {
                        return <li key={index}> <a href={window.location.origin + "//" + l.srcURL} target="_blank"> {l.title} </a> </li>
                        })
                    }
                </ul>
        }
        catch (error) {
            console.log('%c No list was pass OR incorrect type was passed in for list', 'background: #222; color: lightgreen');
        }
    }
    //Checks if the list should be rendered as links that start downloading a file from the site
    if (props.isDownloadable) {
        try {
            prtLinkDwnldContent =
                <ul>
                    {
                        list.map((l, index) => {
                        return <li key={index}> <a href={window.location.origin + "//" + l.srcURL} download> {l.title} </a> </li>
                        })
                    }
                </ul>
        }
        catch (error) {
            console.log('%c No list was pass OR incorrect type was passed in for list', 'background: #222; color: lightgreen');
        }
    }
    return (
        <div className="genericBlock" id="genericBlock" style={props.styles}>
            <h1>{props.heading}</h1>
            <h3>{props.subHeading}</h3>
            <div className="genericBlockContent">
                {faqDescription}
                {lstParaFAQContent}
                {prtLinkDwnldContent}
                {props.children}
            </div>
            <h3> {props.videoDescription}</h3>
        </div>
        );
}

export default GenericBlock;

//{
//    props.isFAQ !== true ?
//        props.noContent !== true ?
//            props.isList === true ?
//                <ul>
//                    {
//                        content.map((p, i) => {
//                            return <li key={i}>{p}</li>
//                        })
//                    }
//                </ul>
//                : content.map((p, i) => {
//                    return <p key={i}>{p}</p>
//                })
//            : null
//        : faqContent.map((p, index) => {
//            return <div key={index}>
//                <p style={{ fontWeight: "bold" }}>{index + 1 + ". "}{p.question}</p>
//                {p.answer.map((a, i) => {
//                    return <p key={i}> {a} </p>
//                })}
//            </div>
//        })
//}  