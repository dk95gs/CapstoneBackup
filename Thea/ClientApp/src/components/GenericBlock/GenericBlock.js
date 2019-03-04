import React from 'react';
import './GenericBlock.css';
const GenericBlock = (props) => {
    const content = props.content;
    const faqContent = props.faqContent;
    const list = props.list;

    let lstParaFAQContent = null;
    let faqDescription = null;
    let prtLinkDwnldContent = null;
    
    if (props.hasContentAndFAQ === true) {
        faqDescription = content.map((p, i) => {
            return <p key={i}>{p}</p>
        });
    }
    if (props.isFAQ !== true) {
        if (props.noContent !== true) {
            if (props.isList === true) {
                lstParaFAQContent =
                    <ul>
                    {
                        content.map((p, i) => {
                            return <li key={i}>{p}</li>
                        })
                    }
                    </ul>
            }
            else
            {
                lstParaFAQContent = content.map((p, i) => {
                    return <p key={i}>{p}</p>
                });
            }
        }
        else
        {
            //no content
        }
    }
    else
    {
        lstParaFAQContent = faqContent.map((p, index) => {
            return <div key={index}>
                <p style={{ fontWeight: "bold" }}>{index + 1 + ". "}{p.question}</p>
                {p.answer.map((a, i) => {
                    return <p key={i}> {a} </p>
                })}
            </div>
        });

    }
    if (props.isLinks) {
        prtLinkDwnldContent =
        <ul>
            {
                list.map((l, index) => {
                return <li key={index}> <a href={l.srcURL} target="_blank"> {l.title }</a></li>
                    })
            }
        </ul>    
    }
    if (props.isPrintable) {
        prtLinkDwnldContent = 
        <ul>
        {
            list.map((l, index) => {
                return <li key={index}> <a href={window.location.origin + l.srcURL} target="_blank"> {l.title} </a> </li>
            })
        }
        </ul>
    }
    if (props.isDownloadable) {
        prtLinkDwnldContent = 
        <ul>
            {
                list.map((l, index) => {
                    return <li key={index}> <a href={window.location.origin + l.srcURL} download> {l.title} </a> </li>
                })
            }
        </ul>
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