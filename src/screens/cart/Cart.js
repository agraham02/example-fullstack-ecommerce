import React, { useContext, useEffect, useState } from "react";
import "./Cart.css"; // Importing the CSS file
import { Link } from "react-router-dom";
import { URL, defaultImg, deleteRequest, formatMoney, getRequest, patchRequest } from "utils";
import { AppContext } from "App";
import CustomButton from "components/customs/CustomButton";

export default function Cart() {
    // Placeholder data - in a real app, this would be fetched from a backend
    // const [cartItems, setCartItems] = useState([
    //     { id: 1, name: "Product 1", price: 10.99, quantity: 2 },
    //     { id: 2, name: "Product 2", price: 15.99, quantity: 1 },
    //     // Add more products as needed
    // ]);

    const [cart, setCart] = useState({});
    const [cartItems, setCartItems] = useState([]);

    async function fetchCart() {
        const results = await getRequest("/cart");
        setCart(results);
        console.log(results);
        const cartContentsAsArray = Object.values(results.contents);
        setCartItems(cartContentsAsArray);
        console.log(cartContentsAsArray);
    }

    useEffect(() => {
        fetchCart();
    }, []);

    const handleQuantityChange = (id, newQuantity) => {
        setCartItems(
            cartItems.map((item) =>
                item.id === id ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const handleRemoveItem = (id) => {
        setCartItems(cartItems.filter((item) => item.id !== id));
    };

    const handleClearCart = () => {
        setCartItems([]); // Clears the cart
    };

    const totalItems = cartItems.reduce(
        (total, item) => total + item.quantity,
        0
    );

    return (
        <div className="cart">
            <h1>Your Cart</h1>
            <div className="cart-items">
                {cartItems.map((item) => (
                    <CartItem2 itemData={item} fetchCart={fetchCart}/>
                ))}
            </div>
            {cartItems.length > 0 && (
                <button onClick={handleClearCart} className="clear-cart-button">
                    Clear Cart
                </button>
            )}
            <div className="cart-summary">
                <p>Total Items: {totalItems}</p>
                <p>Total Price: {formatMoney(cart.total)}</p>
            </div>
            <Link to="/checkout">
                {/* <CustomButton text="Proceed to checkout" /> */}
                <button className="checkout-button">Checkout</button>
            </Link>
        </div>
    );
}

function CartItem2({ itemData, fetchCart }) {
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