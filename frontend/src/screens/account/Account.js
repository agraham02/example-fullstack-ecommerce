import React from "react";
import "./Account.css"; // Importing the CSS file

export default function Account() {
    return (
        <div className="account-details">
            <h1>Your Account</h1>
            <div className="personal-info">
                <form>
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input type="text" id="username" name="username" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" />
                    </div>
                    <button type="submit">Update Details</button>
                </form>
            </div>
            <div className="address-section">
                <h2>Saved Addresses</h2>
                {/* Placeholder for address list */}
                <div className="address-list">
                    <p>Address 1</p>
                    <p>Address 2</p>
                    {/* Add more addresses as needed */}
                </div>

                <form>
                    <h3>Update Address</h3>
                    <div className="form-group">
                        <label htmlFor="address">Address:</label>
                        <input type="text" id="address" name="address" />
                    </div>
                    <button type="submit">Save Address</button>
                </form>
            </div>
            <div className="credit-card-section">
                <h2>Saved Credit Cards</h2>
                {/* Placeholder for credit card list */}
                <div className="credit-card-list">
                    <p>Card Ending in 1234</p>
                    <p>Card Ending in 5678</p>
                    {/* Add more cards as needed */}
                </div>

                <form>
                    <h3>Update Credit Card</h3>
                    <div className="form-group">
                        <label htmlFor="cardNumber">Card Number:</label>
                        <input type="text" id="cardNumber" name="cardNumber" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="expiry">Expiry Date:</label>
                        <input
                            type="text"
                            id="expiry"
                            name="expiry"
                            placeholder="MM/YY"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="cvv">CVV:</label>
                        <input type="text" id="cvv" name="cvv" />
                    </div>
                    <button type="submit">Save Card</button>
                </form>
            </div>
        </div>
    );
}
