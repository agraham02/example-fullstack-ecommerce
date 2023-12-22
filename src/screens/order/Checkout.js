// Checkout.js
import React, { useState } from "react";
import "./Checkout.css"; // Importing the CSS file
import { Link, useLocation, useNavigate } from "react-router-dom";
import { postRequest } from "utils";
import CustomButton from "components/customs/CustomButton";

export default function Checkout() {
    const nav = useNavigate();
    const location = useLocation();

    const [addressData, setAddressData] = useState(
        location.state?.addressData || {
            name: "",
            addressLine1: "",
            addressLine2: "",
            city: "",
            state: "",
            country: "",
            zipCode: "",
        }
    );
    const [cardData, setCardData] = useState(
        location.state?.cardData || {
            cardNumber: "",
            expiryDate: "",
            cvv: "",
        }
    );

    // const handleChange = (e) => {
    //     setFormData({ ...formData, [e.target.name]: e.target.value });
    // };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     // Handle form submission logic here (e.g., updating state, sending data to backend)
    //     alert("Checkout details submitted!");
    // };

    async function handleOrderSubmit() {
        const results = await postRequest("/accounts/orders", {
            addressData,
            cardData,
        });
        nav("/order-confirmation", { state: { hello: "there" } });
        console.log(results);
    }

    return (
        <div className="checkout">
            <h1>Checkout</h1>
            <AddressForm
                addressData={addressData}
                setAddressData={setAddressData}
            />
            <CardForm cardData={cardData} setCardData={setCardData} />
            {/* Submit Button */}
            <Link to="/confirm-order" state={{ addressData, cardData }}>
                <CustomButton text="Proceed to Confirmation" />
            </Link>
        </div>
    );
}

function AddressForm({ addressData, setAddressData }) {
    const handleChange = (e) => {
        setAddressData({ ...addressData, [e.target.name]: e.target.value });
    };

    return (
        <form>
            <div className="form-group">
                <label>Name:</label>
                <input
                    type="text"
                    name="name"
                    value={addressData.name}
                    onChange={handleChange}
                />
            </div>
            {/* Address Line 1 */}
            <div className="form-group">
                <label>Address Line 1:</label>
                <input
                    type="text"
                    name="addressLine1"
                    value={addressData.addressLine1}
                    onChange={handleChange}
                />
            </div>
            {/* Address Line 2 */}
            <div className="form-group">
                <label>Address Line 2:</label>
                <input
                    type="text"
                    name="addressLine2"
                    value={addressData.addressLine2}
                    onChange={handleChange}
                />
            </div>
            {/* City */}
            <div className="form-group">
                <label>City:</label>
                <input
                    type="text"
                    name="city"
                    value={addressData.city}
                    onChange={handleChange}
                />
            </div>
            {/* State */}
            <div className="form-group">
                <label>State:</label>
                <input
                    type="text"
                    name="state"
                    value={addressData.state}
                    onChange={handleChange}
                />
            </div>
            {/* Country */}
            <div className="form-group">
                <label>Country:</label>
                <input
                    type="text"
                    name="country"
                    value={addressData.country}
                    onChange={handleChange}
                />
            </div>
            {/* ZIP Code */}
            <div className="form-group">
                <label>ZIP Code:</label>
                <input
                    type="text"
                    name="zipCode"
                    value={addressData.zipCode}
                    onChange={handleChange}
                />
            </div>
        </form>
    );
}

function CardForm({ cardData, setCardData }) {
    const handleChange = (e) => {
        setCardData({ ...cardData, [e.target.name]: e.target.value });
    };

    return (
        <form>
            {/* Credit Card Details */}
            <div className="form-group">
                <label>Card Number:</label>
                <input
                    type="text"
                    name="cardNumber"
                    value={cardData.cardNumber}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label>Expiration Date:</label>
                <input
                    type="text"
                    name="expiryDate"
                    value={cardData.expiryDate}
                    onChange={handleChange}
                    placeholder="MM/YY"
                />
            </div>
            <div className="form-group">
                <label>CVV:</label>
                <input
                    type="text"
                    name="cvv"
                    value={cardData.cvv}
                    onChange={handleChange}
                />
            </div>
        </form>
    );
}
