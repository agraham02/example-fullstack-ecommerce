import React, { useState } from "react";
import "./PlaceOrderScreen.css";
import CustomButton from "components/customs/CustomButton";
import { postRequest } from "utils";
import { useNavigate } from "react-router-dom";

export default function PlaceOrderScreen() {
    const [address, setAddress] = useState({});
    const nav = useNavigate();

    function handleAddresInputChange(e) {
        setAddress({
            ...address,
            [e.target.name]: e.target.value,
        });
    }

    async function handleOrderSubmit() {
        const results = await postRequest("/accounts/orders", { address });
        nav("/order-confirmation");
        console.log(results);
    }

    return (
        <div>
            <div className="address-input-container">
                <form>
                    <label>
                        Name:{" "}
                        <input
                            type="text"
                            name="name"
                            value={address.name || ""}
                            onChange={handleAddresInputChange}
                        />
                    </label>
                    <label>
                        Address line 1:{" "}
                        <input
                            type="text"
                            name="line1"
                            value={address.line1 || ""}
                            onChange={handleAddresInputChange}
                        />
                    </label>
                    <label>
                        Address line 2:{" "}
                        <input
                            type="text"
                            name="line2"
                            value={address.line2 || ""}
                            onChange={handleAddresInputChange}
                        />
                    </label>
                    <label>
                        City:{" "}
                        <input
                            type="text"
                            name="city"
                            value={address.city || ""}
                            onChange={handleAddresInputChange}
                        />
                    </label>
                    <label>
                        State:{" "}
                        <input
                            type="text"
                            name="state"
                            value={address.state || ""}
                            onChange={handleAddresInputChange}
                        />
                    </label>
                    <label>
                        Postal code:{" "}
                        <input
                            type="text"
                            name="postalCode"
                            value={address.postalCode || ""}
                            onChange={handleAddresInputChange}
                        />
                    </label>
                    <label>
                        Country:{" "}
                        <input
                            type="text"
                            name="country"
                            value={address.country || ""}
                            onChange={handleAddresInputChange}
                        />
                    </label>
                </form>
                <CustomButton
                    text="Place Order"
                    handleFunction={handleOrderSubmit}
                />
            </div>
        </div>
    );
}
