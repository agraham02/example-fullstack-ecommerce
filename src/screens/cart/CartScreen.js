import CustomButton from "components/customs/CustomButton";
import React, { useState } from "react";
import "./CartScreen.css";

function CartScreen() {
    return (
        <div className="cartScreen-container">
            <div className="cart-items">
                <CartItem />
                <CartItem />
                <CartItem />
                <CartItem />
                <CartItem />
                <CartItem />
                <CartItem />
                <CartItem />
                <CartItem />
                <CartItem />
                <CartItem />
                <CartItem />
            </div>
            <div className="proceedToCheckout">
                <div>
                    Subtotal (12 items):{" "}
                    <div style={{ fontWeight: 700, display: "inline-block" }}>
                        $178.18
                    </div>
                </div>
                <CustomButton text="Proceed to checkout" />
            </div>
        </div>
    );
}

function CartItem() {
    const [quantity, setQuantity] = useState(1);

    const increaseQuantity = () => {
        if (quantity < 10) {
            setQuantity((prev) => prev + 1);
        }
    };

    const decreaseQuantity = () => {
        if (quantity > 0) {
            setQuantity((prev) => prev - 1);
        }
    };

    return (
        <div className="cart-item">
            <div className="img-container"></div>
            <div className="info">
                <div>
                    <p>Name</p>
                    <p>Color</p>
                    <p>Size</p>
                </div>
                <div className="interactions">
                    <div>$1.99</div>
                    <div className="item-cnt">
                        <div
                            onClick={decreaseQuantity}
                            style={
                                quantity <= 0
                                    ? { color: "gray" }
                                    : { color: "initial" }
                            }
                        >
                            -
                        </div>
                        <p>{quantity}</p>
                        <div
                            onClick={increaseQuantity}
                            style={
                                quantity >= 10
                                    ? { color: "gray" }
                                    : { color: "initial" }
                            }
                        >
                            +
                        </div>
                    </div>
                    <CustomButton type="TERTIARY" text="Delete" />
                </div>
            </div>
        </div>
    );
}

export default CartScreen;
