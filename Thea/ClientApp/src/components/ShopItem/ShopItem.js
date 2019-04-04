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
    return (
        <div className="shopItem">
            <div className="row">
                <div className="col-2">
                    <img className="shopImage" src={window.location.origin + "/" + props.imgUrl} />
                </div>
                <div className="col-10">
                    <h1>{props.name}</h1>
                    {props.children}
                    {description}
                </div>
            </div>
            <div className="buyButton">
                <form target="paypal" action="https://www.paypal.com/cgi-bin/webscr" method="post">
                    <input type="hidden" name="cmd" value="_s-xclick" />
                    <input type="hidden" name="hosted_button_id" value={props.code} />
                    <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_cart_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!" />
                    <img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1" />
                </form>
            </div>
        </div>
        );
}

export default ShopItem;