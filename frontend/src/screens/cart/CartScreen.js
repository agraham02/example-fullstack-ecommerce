import CustomButton from "components/customs/CustomButton";
import React, { useContext, useEffect, useState } from "react";
import "./CartScreen.css";
import { URL, defaultImg, deleteRequest, getRequest, patchRequest } from "utils";
import { AppContext } from "App";
import { Link } from "react-router-dom";

function CartScreen() {
    const [cart, setCart] = useState({});
    const [contents, setContents] = useState([]);

    async function fetchCart() {
        const results = await getRequest("/cart");
        setCart(results);
        console.log(results);
        const cartContentsAsArray = Object.values(results.contents);
        setContents(cartContentsAsArray);
        console.log(cartContentsAsArray);
    }

    useEffect(() => {
        fetchCart();
    }, []);

    return (
        <div className="cartScreen-container">
            <div className="cart-items">
                {/* <CartItem />
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
                <CartItem /> */}
                {contents.map((cartItem, index) => (
                    <CartItem
                        key={index}
                        itemData={cartItem}
                        fetchCart={fetchCart}
                    />
                ))}
            </div>
            <div className="proceedToCheckout">
                <div>
                    Subtotal (12 items):{" "}
                    <div style={{ fontWeight: 700, display: "inline-block" }}>
                        ${cart ? cart.total : 0}
                    </div>
                </div>
                <Link to="/place-order">
                    <CustomButton text="Proceed to checkout" />
                </Link>
            </div>
        </div>
    );
}

function CartItem({ itemData, fetchCart }) {
    const [quantity, setQuantity] = useState(itemData.quantity);
    const [productData, setProductData] = useState({});
    const [images, setImages] = useState([]);
    const [imgIndex, setImgIndex] = useState(0);
    const { updateCartSize } = useContext(AppContext);

    async function getProductInfo() {
        const results = await getRequest(`/products/${itemData.productId}`);
        setProductData(results);
        setImages(results.imgSrc || []);
    }

    async function increaseQuantity() {
        if (quantity < 10) {
            const response = await patchRequest("/cart/add", {
                productId: productData._id,
                quantity: 1,
            });
            fetchCart();
            updateCartSize();
            setQuantity((prev) => prev + 1);
        }
    }

    async function decreaseQuantity() {
        if (quantity > 0) {
            const response = await patchRequest("/cart/subtract", {
                productId: productData._id,
                quantity: 1,
            });
            fetchCart();
            updateCartSize();
            setQuantity((prev) => prev - 1);
        }
    }

    async function removeItemFromCart() {
        const results = await deleteRequest(`/cart/${itemData.productId}`);
        fetchCart();
        updateCartSize();
    }

    useEffect(() => {
        getProductInfo();
    }, []);

    if (productData === {}) return null;

    return (
        <div className="cart-item">
            <div className="img-container">
                <img
                    src={
                        images.length
                            ? `${URL}/images/products/${images[imgIndex]}`
                            : defaultImg
                    }
                />
            </div>
            <div className="info">
                <div>
                    <p>{productData.name}</p>
                    <p>Color</p>
                    <p>Size</p>
                </div>
                <div className="interactions">
                    <div>${productData.price}</div>
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
                    <CustomButton
                        type="TERTIARY"
                        text="Remove"
                        handleFunction={removeItemFromCart}
                    />
                </div>
            </div>
        </div>
    );
}

export default CartScreen;
