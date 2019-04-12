import React from 'react';
import './ShopItem.css';
const ShopItem = (props) => {
    let description = [];
    if (props.description !== null && props.description !== undefined) {
        props.description.map((d, index) => {
            description.push(
                <p>{d}</p>
            );
        });
    }
    let styles = { ...props.styles }
    styles.width = "18rem";
    styles.margin = "1rem";
    return (
            <div className="card" style={styles}>
                <img className="card-img-top" src={window.location.origin + "/" + props.imgUrl} alt="Card image cap"/>
                <div className="card-body">
                    <h5 className="card-title">{props.name}</h5>
                    <p className="card-text"> ${props.price}</p>
                        <div className="btn=group">
                            {props.children}
                    <form target="paypal" action="https://www.paypal.com/cgi-bin/webscr" method="post">
                        <input type="hidden" name="cmd" value="_s-xclick" />
                        <input type="hidden" name="hosted_button_id" value={props.code} />
                        <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_cart_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!" />
                        <img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1" />
                    </form>
                        </div>
                    </div>
            </div>
        );
}

export default ShopItem;