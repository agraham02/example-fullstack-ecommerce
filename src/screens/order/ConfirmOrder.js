// ConfirmOrder.js
import CustomButton from "components/customs/CustomButton";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function ConfirmOrder() {
    const location = useLocation();
    const handleConfirmOrder = () => {
        // Handle order confirmation logic here (e.g., sending data to backend)
        alert("Order confirmed!");
    };

    const [addressData, setAddressData] = useState(location.state.addressData);
    const [cardData, setCardData] = useState(location.state.cardData);

    useEffect(() => {
        console.log(location.state);
        setAddressData(location.state.addressData);
        setCardData(location.state.cardData);
    }, []);

    return (
        <div className="confirm-order">
            <h1>Confirm Order</h1>
            <div className="order-summary">
                <h2>Shipping Address</h2>
                <p>{addressData.name}</p>
                <p>{addressData.addressLine1}</p>
                <p>{addressData.addressLine2}</p>
                <p>{`${addressData.city}, ${addressData.state} ${addressData.zipCode}`}</p>
                <p>{addressData.country}</p>

                <h2>Payment Details</h2>
                <p>
                    Card Number: **** **** **** {cardData.cardNumber?.slice(-4)}
                </p>
                <p>Expiry Date: {cardData.expiryDate}</p>

                <div className="order-actions">
                    {/* <button onClick={onEdit} className="edit-button">
                        Edit Details
                    </button> */}
                    <Link to="/checkout" state={{addressData, cardData}}>
                        <CustomButton
                            text="Edit Details"
                        />
                    </Link>
                    <Link to="/cart">
                        <CustomButton
                            text="Edit Cart"
                        />
                    </Link>
                    {/* <button
                        onClick={() => alert("Order confirmed!")}
                        className="confirm-button"
                    >
                        Confirm Order
                    </button> */}
                </div>
            </div>
            {/* Display order summary here */}
            <p>Items: [List of items]</p>
            <p>Total Price: [Total price]</p>
            {/* ... Other summary details ... */}
            <Link to="/order-confirmation">
                <CustomButton
                    text="Confirm Order"
                    handleFunction={handleConfirmOrder}
                />
            </Link>
        </div>
    );
}
